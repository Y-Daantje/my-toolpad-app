import * as React from "react";
import Typography from "@mui/material/Typography";
import { PageContainer } from "@toolpad/core/PageContainer";
import NotesCrud from "../data/aicrud";

export default function ListPage() {
  return (
    <PageContainer>
      <NotesCrud />
    </PageContainer>
  );
}
