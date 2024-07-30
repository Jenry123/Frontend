
import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';

const StyledDataGrid = styled(DataGrid)({
  '& .MuiDataGrid-cell': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

const DataTable = ({ columns, rows, pageSize, onEdit, onDelete }) => {
  const defaultColumns = columns.map((col) => {
    if (col.field === 'actions') {
      return {
        ...col,
        renderCell: (params) => (
          <div>
            <IconButton color="primary" aria-label="edit" onClick={() => onEdit(params.row.id)}>
              <EditIcon />
            </IconButton>
            <IconButton color="secondary" aria-label="delete" onClick={() => onDelete(params.row.id)}>
              <DeleteIcon />
            </IconButton>
          </div>
        ),
      };
    }
    return col;
  });

  return (
    
    <div style={{ height: 600, width: '1200px' }}>
      <StyledDataGrid
        rows={rows}
        columns={defaultColumns}
        pageSize={pageSize}
        rowsPerPageOptions={[pageSize]}
        disableSelectionOnClick
      />
    </div>
  );
};

DataTable.propTypes = {
  columns: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
  pageSize: PropTypes.number,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};

DataTable.defaultProps = {
  pageSize: 5,
  onEdit: () => {},
  onDelete: () => {},
};

export default DataTable;
