import {
  ChatBubbleOutline,
  HomeOutlined,
  NotificationsOutlined,
  PeopleOutline,
  Search,
  WorkOutline,
} from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  InputBase,
  Toolbar,
} from "@mui/material";

export default function Header() {
  return (
    <AppBar position="static">
      <Toolbar className="bg-grey-900 text-white h-20 flex justify-between items-center flex-row-reverse lg:flex-row">
        {/* Left - Logo and Search */}
        <Box className="flex items-center gap-4">
          <span className="text-white font-bold text-xl">
            <span className="text-green-500">iZ</span>AM
          </span>
          <Box className="hidden lg:flex relative bg-white rounded-full items-center px-3 py-1 w-80">
            <IconButton className="rounded-full !bg-green-500">
              <Search className="text-white" />
            </IconButton>
            <InputBase
              placeholder="Search by name, job title, ..."
              className="ml-2 w-full text-black"
            />
          </Box>
        </Box>

        {/* Right - Navigation Links */}
        <Box className=" items-center gap-11 text-white hidden lg:flex">
          <Box className="flex flex-col items-center cursor-pointer">
            <HomeOutlined fontSize="large" />
            <span className="text-xs">Home</span>
          </Box>
          <Box className="flex flex-col items-center cursor-pointer">
            <WorkOutline fontSize="large" />
            <span className="text-xs">Jobs</span>
          </Box>
          <Box className="flex flex-col items-center cursor-pointer">
            <PeopleOutline fontSize="large" />
            <span className="text-xs">Employers</span>
          </Box>
          <span className="border-l border-gray-500 h-6"></span>

          <Box className="flex flex-col items-center cursor-pointer">
            <NotificationsOutlined fontSize="large" className="text-white" />
            <span className="text-xs">Notifications</span>
          </Box>

          <Box className="flex flex-col items-center cursor-pointer">
            <ChatBubbleOutline fontSize="large" className="text-white" />
            <span className="text-xs">Messaging</span>
          </Box>

          <Avatar alt="Profile" src="/profile.jpg" className="cursor-pointer" />
        </Box>

        <Avatar
          alt="Profile"
          src="/profile.jpg"
          className="cursor-pointer inline lg:!hidden"
        />
      </Toolbar>
    </AppBar>
  );
}
