import Button from "@mui/material/Button";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from "react-router-dom";

function PageNotFound() {
  const navigate = useNavigate();

  return (
    <Dialog open={true} >
      <DialogTitle>
        Page Not Found
      </DialogTitle>
      <DialogActions>
        <Button autoFocus onClick={() => navigate(-1)}>Back</Button>
      </DialogActions>
    </Dialog>
  )
}

export default PageNotFound;