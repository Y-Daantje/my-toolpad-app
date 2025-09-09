import * as React from "react";
import { Crud, DataSource, DataSourceCache } from "@toolpad/core/Crud";
import { MOCK_ACTIONS, type IAction } from "./list";

// Make the row type indexable to satisfy Toolpad's DataModel constraint
type Row = IAction & Record<PropertyKey, unknown>;

// Ensure the source array is Row[] (not IAction[])
const ITEMS: Row[] = MOCK_ACTIONS as unknown as Row[];
let db: Row[] = [...ITEMS];

const dataSource: DataSource<Row> = {
  fields: [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "description", headerName: "Description", flex: 1 },
    { field: "userTemplate", headerName: "userTemplate", flex: 1 },
  ],

  async getMany({ paginationModel }) {
    const page = paginationModel.page;
    const pageSize = paginationModel.pageSize;
    const start = page * pageSize;
    return {
      items: db.slice(start, start + pageSize),
      itemCount: db.length,
    };
  },

  async getOne(id) {
    const item = db.find((x) => x.id === String(id));
    if (!item) throw new Error("Not found");
    return item;
  },

  async updateOne(id, data) {
    const itemIndex = db.findIndex((x) => x.id === String(id));
    if (itemIndex === -1) throw new Error("Not found");
    const updatedItem: Row = { ...db[itemIndex], ...data } as Row;
    db[itemIndex] = updatedItem;
    return updatedItem;
  },

  createOne: async (data) => {
    const res = await fetch("list.tsx", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    const resJson = await res.json();

    if (!res.ok) {
      throw new Error(resJson.error);
    }
    return resJson;
  },
};

const cache = new DataSourceCache();

export default function AiCrud() {
  return (
    <Crud<Row>
      rootPath="/list"
      dataSource={dataSource}
      dataSourceCache={cache}
      initialPageSize={16}
      pageTitles={{
        list: "List Items",
        show: "Item",
      }}
    />
  );
}
