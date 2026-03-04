import { prisma } from "./prisma";

const getModel = (table) => prisma[table.model];

const normalizeColumn = (column) => {
  if (typeof column === "string") return column;
  if (column?.field) return column.field;
  if (column?.name) return column.name;
  return column;
};

export const eq = (column, value) => ({
  field: normalizeColumn(column),
  value,
});

const buildWhere = (predicate) => {
  if (!predicate) return undefined;
  const field = normalizeColumn(predicate.field ?? predicate.column ?? predicate);
  return field ? { [field]: predicate.value ?? predicate } : undefined;
};

const mapRecords = (_table, records) => records;

const selectFrom = (table) => {
  let predicate;
  const run = async () => {
    const where = buildWhere(predicate);
    const rows = await getModel(table).findMany({ where });
    return mapRecords(table, rows);
  };

  return {
    where(nextPredicate) {
      predicate = nextPredicate;
      return run();
    },
    then(onFulfilled, onRejected) {
      return run().then(onFulfilled, onRejected);
    },
  };
};

const insertInto = (table) => {
  let values;
  const run = async () => {
    const created = await getModel(table).create({ data: values });
    return [mapRecords(table, created)];
  };

  return {
    values(nextValues) {
      values = nextValues;
      return {
        returning() {
          return run();
        },
        then(onFulfilled, onRejected) {
          return run().then(onFulfilled, onRejected);
        },
      };
    },
  };
};

const deleteFrom = (table) => ({
  async where(predicate) {
    const where = buildWhere(predicate);
    if (!where) return [];

    const model = getModel(table);
    const record = await model.findFirst({ where, select: { id: true } });
    if (!record) return [];

    await model.delete({ where: { id: record.id } });
    return [{ id: record.id }];
  },
});

export const db = {
  select() {
    return { from: selectFrom };
  },
  insert: insertInto,
  delete: deleteFrom,
};
