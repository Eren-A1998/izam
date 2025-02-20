import {
    Chat,
    Home,
    NotificationAdd,
    People,
    Search,
    Work,
} from "@mui/icons-material";
import {
    AppBar,
    Avatar,
    Box,
    IconButton,
    InputBase,
    Toolbar
} from "@mui/material";

type Props = {};

export default function Header({}: Props) {
  return (
    <AppBar position="static">
      <Toolbar className="bg-grey-900 text-white h-20 flex justify-between items-center">
        {/* Left - Logo and Search */}
        <Box className="flex items-center gap-4">
          <span className="text-white font-bold text-xl">
            <span className="text-green-500">iZ</span>AM
          </span>
          <Box className="relative bg-white rounded-full flex items-center px-3 py-1 w-80">
            <Search className="text-green-500" />
            <InputBase
              placeholder="Search by name, job title, ..."
              className="ml-2 w-full text-black"
            />
          </Box>
        </Box>

        {/* Right - Navigation Links */}
        <Box className="flex items-center gap-6 text-white">
          <Box className="flex flex-col items-center cursor-pointer">
            <Home />
            <span className="text-xs">Home</span>
          </Box>
          <Box className="flex flex-col items-center cursor-pointer">
            <Work />
            <span className="text-xs">Jobs</span>
          </Box>
          <Box className="flex flex-col items-center cursor-pointer">
            <People />
            <span className="text-xs">Employers</span>
          </Box>
          <span className="border-l border-gray-500 h-6"></span>
          <IconButton>
            <NotificationAdd className="text-white" />
          </IconButton>
          <IconButton>
            <Chat className="text-white" />
          </IconButton>
          <Avatar alt="Profile" src="/profile.jpg" className="cursor-pointer" />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
