import * as React from "react";
import { PageContainer } from "@toolpad/core/PageContainer";
import AiCrud from "../componets/aicrud";

export default function ListPage() {
  return (
    <PageContainer title="" breadcrumbs={[]}>
      <AiCrud />
    </PageContainer>
  );
}
