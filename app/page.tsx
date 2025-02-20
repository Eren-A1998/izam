"use client"
import { useState } from "react";
import { Box, Switch, MenuItem, Select, Avatar, Chip } from "@mui/material";
import { LocationOn, CalendarToday, FavoriteBorder } from "@mui/icons-material";

export default function Home() {
  const [sort, setSort] = useState("Top match");

  return (
    <Box className="p-6 space-y-4  min-h-screen">
      {/* Sorting & Header Section */}
      <Box className="flex justify-between items-center">
        <span className="text-gray-600">
          Sorting by:
          <Select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            variant="standard"
            className="ml-2 text-green-600"
          >
            <MenuItem value="Top match">Top match</MenuItem>
            <MenuItem value="Newest">Newest</MenuItem>
            <MenuItem value="Most relevant">Most relevant</MenuItem>
          </Select>
        </span>
      </Box>

      {/* Job Category Header */}
      <Box className="bg-green-600 text-white p-4 rounded-lg flex justify-between items-center">
        <Box>
          <h2 className="text-lg font-bold">UI Designer in Egypt</h2>
          <p className="text-sm">70 job positions</p>
        </Box>
        <Box className="flex items-center space-x-2">
          <span>Set alert</span>
          <Switch />
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
        <Box className="flex space-x-2">
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
    </Box>
  );
}
