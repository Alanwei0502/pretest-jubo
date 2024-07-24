import { useCallback, useEffect, useRef, useState } from 'react';
import { OrderApi } from '../apis/order.api';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Input from '@mui/material/Input';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { Paper, Popover, Typography } from '@mui/material';
// import { PatientApi } from '../apis/patient.api';

interface PatientDialogProps {
  viewPatient?: IPatient;
  setViewPatient: React.Dispatch<React.SetStateAction<IPatient | undefined>>
  getPatients: () => Promise<void>;
}

const OrdersDialog: React.FC<PatientDialogProps> = (props) => {
  const { viewPatient, setViewPatient, getPatients } = props;

  const createOrderInputRef = useRef<HTMLInputElement | null>(null);
  const updateOrderInputRef = useRef<HTMLInputElement | null>(null);
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [newOrder, setNewOrder] = useState<Pick<IOrder, 'message'>>();
  const [editOrder, setEditOrder] = useState<IOrder>();
  const [deleteOrder, setDeleteOrder] = useState<IOrder>();
  const [anchorDeleteOrderEl, setAnchorDeleteOrderEl] = useState<HTMLButtonElement | null>(null);
  // const [anchorDeletePatientEl, setAnchorDeletePatientEl] = useState<HTMLButtonElement | null>(null);

  // Get Orders
  const getOrders = useCallback(
    async () => {
      if (!viewPatient) return;
      const res = await OrderApi.getOrders(viewPatient.id);
      if (res.success) {
        setOrders(res?.data ?? []);
      } else {
        console.error(res.error);
      }
    },
    [viewPatient],
  )

  const handleCloseDialog = () => {
    setViewPatient(undefined);
    setOrders([]);
    setNewOrder(undefined);
    setEditOrder(undefined);
    setDeleteOrder(undefined);
    setAnchorDeleteOrderEl(null);
    // setAnchorDeletePatientEl(null);
    getPatients();
  }


  // Create Order Handlers
  const handleOpenCreateOrderInput = () => {
    setNewOrder({ message: '' });
  }

  const handleCancelCreateOrder = () => {
    setNewOrder(undefined);
  }

  const handleCreateOrder = async () => {
    if (!newOrder || !createOrderInputRef.current || !viewPatient) return;
    const res = await OrderApi.createOrder(viewPatient.id, createOrderInputRef.current.value);
    if (res.success) {
      setNewOrder(undefined);
      getOrders();
    } else {
      console.error(res.error);
    }
  }

  // Edit Order Handlers
  const handleEditOrder = (order: IOrder) => {
    setEditOrder(order)
  }

  const handleCancelEditOrder = () => {
    setEditOrder(undefined)
  }

  const handleUpdateOrder = async () => {
    if (!editOrder || !updateOrderInputRef.current) return;
    const res = await OrderApi.updateOrder(editOrder.id, updateOrderInputRef.current.value);
    if (res.success) {
      setEditOrder(undefined);
      getOrders();
    } else {
      console.error(res.error);
    }
  }

  // Delete Order Handlers
  const handleOpenConfirmDeleteOrderPopover = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, order: IOrder) => {
    setAnchorDeleteOrderEl(e.currentTarget);
    setDeleteOrder(order);
  }

  const handleCloseConfirmDeleteOrderPopover = () => {
    setAnchorDeleteOrderEl(null);
    setDeleteOrder(undefined);
  }

  const handleDeleteOrder = async () => {
    if (!deleteOrder) return;
    await OrderApi.deleteOrder(deleteOrder.id);
    setAnchorDeleteOrderEl(null);
    setDeleteOrder(undefined);
    getOrders();
  }

  // Delete Patient Handlers
  // const handleOpenConfirmDeletePatientPopover = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
  //   setAnchorDeletePatientEl(e.currentTarget);
  // }

  // const handleCloseConfirmDeletePatientPopover = () => {
  //   setAnchorDeletePatientEl(null);
  // }

  // const handleDeletePatient = async () => {
  //   if (!viewPatient) return;
  //   await PatientApi.deletePatient(viewPatient.id);
  //   handleCloseDialog();
  // }

  useEffect(() => {
    getOrders();
  }, [getOrders])

  return (
    <>
      <Dialog open={Boolean(viewPatient)} onClose={handleCloseDialog} scroll='paper' aria-labelledby="viewPatient orders dialog" fullWidth>
        <DialogTitle display='flex' justifyContent='space-between' alignItems='center'>
          住民資訊
        </DialogTitle>
        <DialogContent>
          <Paper sx={{ display: 'flex', flexDirection: 'column', gap: 1, p: 1, mb: 2 }}>
            <Typography>姓名：{viewPatient?.name}</Typography>
          </Paper>

          <Typography variant='h6' display='flex' justifyContent='space-between'>
            醫囑
            <Box display='flex' gap={1}>
              {newOrder ? (
                <>
                  <Button onClick={handleCancelCreateOrder}>取消</Button>
                  <Button onClick={handleCreateOrder} color='success'>新增</Button>
                </>
              ) : (
                <Button startIcon={<AddIcon />} onClick={handleOpenCreateOrderInput}>新增醫囑</Button>
              )}
            </Box>
          </Typography>
          <List>
            {newOrder && (
              <ListItem key='new order'>
                <Input fullWidth placeholder='請輸入醫囑內容' inputRef={createOrderInputRef} />
              </ListItem>
            )}
            {orders.length > 0 ?
              orders.map((o, i) => (
                <ListItem key={o.id} divider={i !== orders.length - 1}>
                  {editOrder && editOrder.id === o.id
                    ? (
                      <>
                        <Input fullWidth autoFocus defaultValue={editOrder.message} inputRef={updateOrderInputRef} />
                        <Box display='flex'>
                          <IconButton aria-label='confirm update' edge='end' onClick={handleUpdateOrder} sx={{ mr: .5 }} color='success'>
                            <CheckIcon />
                          </IconButton>
                          <IconButton aria-label='cancel update' edge='end' onClick={handleCancelEditOrder}>
                            <CloseIcon />
                          </IconButton>
                        </Box>
                      </>
                    )
                    : (
                      <>
                        <ListItemText>{o.message}</ListItemText>
                        <Box display='flex'>
                          <IconButton aria-label='edit order' edge='end' onClick={() => handleEditOrder(o)} sx={{ mr: .5 }}>
                            <EditIcon />
                          </IconButton>
                          <IconButton aria-label='delete order' edge='end' onClick={(e) => handleOpenConfirmDeleteOrderPopover(e, o)}>
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      </>
                    )
                  }
                </ListItem>
              ))
              : <Typography textAlign='center' color='GrayText'>無醫囑</Typography>
            }
            <Popover
              open={Boolean(anchorDeleteOrderEl)}
              anchorEl={anchorDeleteOrderEl}
              onClose={() => setAnchorDeleteOrderEl(null)}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <Typography sx={{ p: 2 }}>確認刪除此醫囑？</Typography>
              <Box textAlign='right'>
                <Button onClick={handleCloseConfirmDeleteOrderPopover}>取消</Button>
                <Button onClick={handleDeleteOrder} color='error'>確認</Button>
              </Box>
            </Popover>
          </List>
        </DialogContent>
        <DialogActions>
          {/* <Button color='error' onClick={handleOpenConfirmDeletePatientPopover}>刪除住民</Button>
          <Popover
            open={Boolean(anchorDeletePatientEl)}
            anchorEl={anchorDeletePatientEl}
            onClose={() => setAnchorDeleteOrderEl(null)}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <Typography sx={{ p: 2 }}>確認刪除此住民？</Typography>
            <Box textAlign='right'>
              <Button onClick={handleCloseConfirmDeletePatientPopover}>取消</Button>
              <Button onClick={handleDeletePatient} color='error'>確認</Button>
            </Box>
          </Popover> */}
          <Button onClick={handleCloseDialog}>關閉</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default OrdersDialog