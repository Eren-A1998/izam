"use client";
import Navigation from "@/components/Navigation";
import {
  CalendarToday,
  FavoriteBorder,
  LocationOn,
  MenuOutlined
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Chip,
  Drawer,
  IconButton,
  MenuItem,
  Select,
  Switch
} from "@mui/material";
import { useState } from "react";

export default function Home() {
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const [sort, setSort] = useState("Top match");

  return (
    <Box className="p-6 space-y-4  min-h-screen">
      {/* Sorting & Header Section */}
      <Box className="flex justify-end items-center">
        <span className="text-gray-600">
          Sorting by:
          <Select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            variant="outlined"
            size="small"
            className="ml-2 !text-green-600 !border-none"
            inputProps={{
              className: "!border-none",
            }}
          >
            <MenuItem value="Top match">Top match</MenuItem>
            <MenuItem value="Newest">Newest</MenuItem>
            <MenuItem value="Most relevant">Most relevant</MenuItem>
          </Select>
        </span>
      </Box>

      {/* Job Category Header */}
      <Box className="flex items-center gap-x-3">
        <Box className="bg-green-600 text-white p-4 rounded-lg flex flex-wrap gap-y-3 justify-between items-center flex-1 min-h-20">
          <Box>
            <h2 className="text-lg font-bold">UI Designer in Egypt</h2>
            <p className="text-sm">70 job positions</p>
          </Box>
          <Box className="flex items-center space-x-2">
            <span>Set alert</span>
            <Switch />
          </Box>
        </Box>

        <Box className="border !border-grey-50 lg:hidden flex justify-center items-center !h-full !min-h-full">
          <IconButton onClick={() => setOpenMobileMenu(true)}>
            <MenuOutlined className="text-grey-50" fontSize="large" />
          </IconButton>
        </Box>
      </Box>

      {/* Job Card */}
      <Box className="bg-green-50 border border-green-300 rounded-lg p-4 space-y-3">
        {/* Job Title & Company */}
        <Box className="flex items-center space-x-4">
          <Avatar src="/company-logo.png" alt="Company Logo" />
          <Box>
            <h3 className="text-lg font-bold">Gaming UI Designer</h3>
            <p className="text-blue-600 text-sm font-semibold">
              Rockstar Games
            </p>
          </Box>
        </Box>

        {/* Job Details */}
        <Box className="flex items-center space-x-4 text-gray-600 text-sm">
          <Box className="flex items-center space-x-1">
            <LocationOn fontSize="small" />
            <span>ElMansoura, Egypt</span>
          </Box>
          <Box className="flex items-center space-x-1">
            <CalendarToday fontSize="small" />
            <span>10 days ago</span>
          </Box>
        </Box>

        {/* Job Badges */}
        <Box className="flex flex-wrap gap-2">
          <Chip label="0 - 3y of exp" variant="outlined" />
          <Chip label="Full time" variant="outlined" />
          <Chip label="Remote" variant="outlined" />
        </Box>

        {/* Job Categories */}
        <Box className="text-sm text-gray-500">
          Creative / Design - IT / Software development - Gaming
        </Box>

        {/* Save Job Button */}
        <Box className="flex justify-end">
          <FavoriteBorder className="text-gray-400 cursor-pointer" />
        </Box>
      </Box>

      <Drawer
        className="lg:hidden"
        PaperProps={{
          className: "min-w-80",
        }}
        onClose={() => setOpenMobileMenu(false)}
        open={openMobileMenu}
      >
        <Navigation CloseMobileMenu={() => setOpenMobileMenu(false)} />
      </Drawer>
    </Box>
  );
}
