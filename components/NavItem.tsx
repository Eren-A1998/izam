import {
  ArrowUpIcon,
  EditIcon,
  InvisibleIcon,
  VisibleIcon,
} from "@/public/assets/MainLayoutIcons";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { Collapse, IconButton, List, ListItem, TextField } from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { NavItem } from "../types";

interface Props {
  item: NavItem;
  index: number;
  level: number;
  parentId: number | null;
  moveItem: (
    fromIndex: number,
    toIndex: number,
    parentId: number | null
  ) => void;
  updateNavItem: (id: number, newTitle?: string) => void;
  enableEdit?: boolean;
}

const NavItemComponent: React.FC<Props> = ({
  item,
  index,
  moveItem,
  updateNavItem,
  enableEdit,
  level,
  parentId,
}) => {
  const [title, setTitle] = useState(item.title);
  const [open, setOpen] = useState(false);
  const ItemType = "NAV_ITEM";

  const [{ isDragging }, drag] = useDrag({
    type: ItemType,
    item: { index, level, parentId },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: ItemType,
    drop: (draggedItem: {
      index: number;
      level: number;
      parentId: number | null;
    }) => {
      console.log({ draggedItem }, { index, level, parentId });
      // Prevent dragging between different levels
      if (draggedItem.level !== level) return;

      if (draggedItem.index !== index) {
        moveItem(draggedItem.index, index, parentId);
        // draggedItem.index = index;
      }
    },
  });

  return (
    <>
      <ListItem
        ref={(node) => {
          if (node) {
            drag(drop(node));
          }
        }}
        sx={{ opacity: isDragging ? 0.5 : 1 }}
        className={`!justify-between !px-8 ${
          item.visible ? "" : enableEdit ? "!text-grey-50" : "!hidden"
        }`}
      >
        <div className={`flex items-center `}>
          {enableEdit && (
            <IconButton>
              <DragIndicatorIcon
                className={`${item.visible ? "" : "text-grey-50"}`}
              />
            </IconButton>
          )}
          {enableEdit ? (
            <TextField
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              //   onBlur={() => updateNavItem(item.id, title)}
              className={`!p-0 rounded ${item.visible ? "" : "!text-grey-50"}`}
              sx={{ "& fieldset": { border: "none" } }}
              inputProps={{
                className: `${item.visible ? "" : "!text-grey-50"}`,
              }}
              size="small"
            />
          ) : (
            <Link href={item.target || ""}>{title}</Link>
          )}
        </div>

        {enableEdit ? (
          <div className="flex items-center gap-x-5">
            <button>
              <EditIcon />
            </button>
            <button onClick={() => updateNavItem(item.id)}>
              {item.visible ? <VisibleIcon /> : <InvisibleIcon />}
            </button>
          </div>
        ) : item.children ? (
          <IconButton onClick={() => setOpen(!open)}>
            <ArrowUpIcon className={`${open ? "" : "rotate-180"}`} />
          </IconButton>
        ) : null}
      </ListItem>

      {item.children && (
        <Collapse in={enableEdit ? true : open} className="!my-0">
          <List sx={{ pl: 4 }}>
            {item.children.map((child, i) => (
              <NavItemComponent
                enableEdit={enableEdit}
                key={child.id}
                item={child}
                index={i}
                level={level + 1}
                parentId={item.id}
                moveItem={moveItem}
                updateNavItem={updateNavItem}
              />
            ))}
          </List>
        </Collapse>
      )}
    </>
  );
};

export default NavItemComponent;
