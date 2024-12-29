import { Typography } from '@mui/material'
import CustomButton from '../../components/button/CustomButton'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useAppDispatch } from '../../hooks/storeHooks';
import { clearAllProjectErrors ,resetProjectSlice  } from '../../store/slices/projectSlice';
import { toast } from 'react-toastify';
import { ExtendedColumn } from '../../types/table-types';
import CustomTable from '../../components/table/CustomTable';
import './manageProject-styles.scss'

const manageProject = () => {
  const navigateTo = useNavigate();
  const handleReturnToDashboard = () => {
    navigateTo("/");
  };

  const dispatch = useAppDispatch();

  const { loading, projects, error, message } = useSelector(
    (state:RootState) => state.project
  );

  const transformedProjectData = projects.map(item => ({
    id: item._id,
    title: item.title,
    image:item.image.url,
    stack:item.stack,
    deployed:item.deployed
  }));

  const handleUpdateProject = (row) => {
    navigateTo(`/update/project/${row.id}`);
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllProjectErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetProjectSlice());
    }
  }, [dispatch, loading, error]);

  const PROJECTS_TABLE_FIELDS: ExtendedColumn[] = [
    {
      field: 'image',
      headerName: 'Banner',
      flex: 1,
      renderCell: params => (
        <img
          src={params.value}
          alt="icon"
          style={{ width: 40, height: 40, objectFit: 'cover',alignSelf:'center' }}
        />
      ),
    },
    {
      field: 'title',
      headerName: 'Name',
      type: 'string',
      flex: 1,
    },
    {
      field: 'stack',
      headerName: 'Stack',
      type: 'string',
      flex: 1,
    },
    {
      field: 'deployed',
      headerName: 'Deployed',
      type: 'string',
      flex: 1,
    },
  ];

  return (
    <div className='manageProject__container'>
      <div className='manageProject__subContainer'>
        <Typography className='manageProject__title'>Manage Project</Typography>
        <CustomButton title='Back' onClick={handleReturnToDashboard} fullWidth={false} buttonClass='manageProject__buttonTitle'/>
      </div>
      <CustomTable
        actions={{
          edit:true,
        }}
        handleActionClick={handleUpdateProject}
        columns={PROJECTS_TABLE_FIELDS}
        rows={transformedProjectData}
        loading={loading}
      />
    </div>
  )
}

export default manageProject