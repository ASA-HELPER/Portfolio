import { Typography } from '@mui/material'
import CustomButton from '../../components/button/CustomButton'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useAppDispatch } from '../../hooks/storeHooks';
import { clearAllTimelineErrors, deleteTimeline, getAllTimeline, resetTimelineSlice } from '../../store/slices/timelineSlice';
import { toast } from 'react-toastify';
import { ExtendedColumn } from '../../types/table-types';
import CustomTable from '../../components/table/CustomTable';
import './manageTimeline-styles.scss'

const ManageTimeline = () => {
  const navigateTo = useNavigate();
  const handleReturnToDashboard = () => {
    navigateTo("/");
  };

  const dispatch = useAppDispatch();

  const { loading, timeline, error, message } = useSelector(
    (state:RootState) => state.timeline
  );

  const transformedTimelineData = timeline.map(item => ({
    id: item._id,
    title: item.title,
    description:item.description,
    from:item.timeline.from,
    to:item.timeline.to
  }));


  const handleDeleteTimeline = (id) => {
    dispatch(deleteTimeline(id));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllTimelineErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetTimelineSlice());
      dispatch(getAllTimeline());
    }
  }, [dispatch, loading, error]);

  const TIMELINE_TABLE_FIELDS: ExtendedColumn[] = [
    {
      field: 'title',
      headerName: 'Name',
      type: 'string',
      flex: 1,
    },
    {
      field: 'description',
      headerName: 'Description',
      type: 'string',
      flex: 2,
    },
    {
      field: 'from',
      headerName: 'Start',
      type: 'number',
      flex: 1,
    },
    {
      field: 'to',
      headerName: 'END',
      type: 'number',
      flex: 1,
    },
  ];

  return (
    <div className='manageTimeline__container'>
      <div className='manageTimeline__subContainer'>
        <Typography className='manageTimeline__title'>Manage Timeline</Typography>
        <CustomButton title='Back' onClick={handleReturnToDashboard} fullWidth={false} buttonClass='manageTimeline__buttonTitle'/>
      </div>
      <CustomTable
        actions={{
          delete:true,
        }}
        handleActionClick={handleDeleteTimeline}
        columns={TIMELINE_TABLE_FIELDS}
        rows={transformedTimelineData}
        loading={loading}
      />
    </div>
  )
}

export default ManageTimeline