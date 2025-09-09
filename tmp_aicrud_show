
import * as React from "react";
import { Crud, DataSource, DataSourceCache } from "@toolpad/core/crud";
import { MOCK_ACTIONS, type IAction } from "./list";

// Make the row type indexable to satisfy Toolpad's DataModel constraint
type Row = IAction & Record<PropertyKey, unknown>;

// ✅ Ensure the source array is Row[] (not IAction[])
const ITEMS: Row[] = MOCK_ACTIONS as unknown as Row[];
// let db: Row[] = [...ITEMS];

const dataSource: DataSource<Row> = {
  fields: [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "description", headerName: "Description", flex: 1 },
  ],

  async getMany({ paginationModel }) {
    const page = paginationModel?.page ?? 0;
    const pageSize = paginationModel?.pageSize ?? 10;
    const start = page * pageSize;
    // ✅ Return Row[]
    return {
      items: ITEMS.slice(start, start + pageSize),
      itemCount: ITEMS.length,
    };
  },

  async getOne(id) {
    const item = ITEMS.find((x) => x.id === id);
    if (!item) throw new Error("Not found");
    return item; // ✅ Row
  },

  // async updateOne(id, data) {
  //   const itemIndex = db.findIndex((x) => x.id === id);
  //   if (itemIndex === -1) throw new Error("Not found");
  //   const updatedItem = { ...db[itemIndex], ...data };
  //   db[itemIndex] = updatedItem;
  //   return updatedItem;
  // },
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
