import React, { FC, useEffect, useRef } from "react";
import Table from "@airtable/blocks/dist/types/src/models/table";
import { useRecordById, useRecordIds } from "@airtable/blocks/ui";

interface WatchTableProps {
  table: Table;
  onTableDataChange: () => void;
}

const WatchTable: FC<WatchTableProps> = ({ table, onTableDataChange }) => {
  const recordIds = useRecordIds(table);

  console.log(`Fetch trigger: watching records on ${table.name}`);
  return (
    <>
      {recordIds.map((id) => (
        <WatchRecord
          table={table}
          key={id}
          recordId={id}
          onTableDataChange={onTableDataChange}
        />
      ))}
    </>
  );
};

export default WatchTable;

interface WatchRecordProps {
  table: Table;
  recordId: string;
  onTableDataChange: () => void;
}

const WatchRecord: FC<WatchRecordProps> = ({
  table,
  recordId,
  onTableDataChange,
}) => {
  const record = useRecordById(table, recordId);
  const renderCount = useRef(0);

  useEffect(() => {
    if (renderCount.current !== 0) {
      onTableDataChange();
    } else {
      // console.log("not triggering webhook since it is the first render.");
    }
    renderCount.current++;
    return () => {};
  }, [onTableDataChange, record]);

  return null;
};
