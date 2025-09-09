import * as React from "react";
import { Crud, DataSource, DataSourceCache } from "@toolpad/core/crud";
import { MOCK_ACTIONS, type IAction } from "./list";

type Row = IAction & Record<PropertyKey, unknown>;

// Immutable seed + mutable working copy
const SEED: Row[] = MOCK_ACTIONS as unknown as Row[];
let db: Row[] = [...SEED];

const dataSource: DataSource<Row> = {
  fields: [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "description", headerName: "Description", flex: 3 }, // give it more space
  ],

  // 🔄 Always read from `db`, not SEED
  async getMany({ paginationModel }) {
    const page = paginationModel?.page ?? 0;
    const pageSize = paginationModel?.pageSize ?? 10;
    const start = page * pageSize;
    return {
      items: db.slice(start, start + pageSize),
      itemCount: db.length,
    };
  },

  async getOne(id) {
    const item = db.find((x) => x.id === id);
    if (!item) throw new Error("Not found");
    return item;
  },

  // ✍️ Enable Edit
  async updateOne(id, patch) {
    const i = db.findIndex((x) => x.id === id);
    if (i === -1) throw new Error("Not found");

    const updated: Row = {
      ...db[i],
      ...patch,
      // optional: update timestamp if your model has it
      ...(db[i].updatedAtUtc !== undefined && {
        updatedAtUtc: new Date().toISOString(),
      }),
    };

    db[i] = updated;
    return updated; // must return the updated row
  },

  // (optional) basic validation so empty strings aren't saved
  validate(values) {
    const issues: { message: string; path: (keyof Row)[] }[] = [];
    if (!String(values.name ?? "").trim())
      issues.push({ message: "Name is required", path: ["name"] });
    if (!String(values.description ?? "").trim())
      issues.push({
        message: "Description is required",
        path: ["description"],
      });
    return { issues };
  },
};

const cache = new DataSourceCache();

export default function NotesCrud() {
  return (
    <Crud<Row>
      rootPath="/list"
      dataSource={dataSource}
      dataSourceCache={cache}
      initialPageSize={16}
      pageTitles={{ list: "List Items", show: "Item", edit: "Edit Item" }}
    />
  );
}
