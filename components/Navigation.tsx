import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchNav, saveNav, trackReorder } from "@/api/services/navService";
import { NavItem } from "../types";
import { IconButton, List } from "@mui/material";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import NavItemComponent from "./NavItem";
import {
  CancleIcon,
  SaveIcon,
  SettingsIcon,
} from "@/public/assets/MainLayoutIcons";
import { toast } from "react-toastify";
import { ArrowBack } from "@mui/icons-material";

type Props = {
  CloseMobileMenu?: () => void;
};

const Navigation: React.FC<Props> = ({ CloseMobileMenu }) => {
  const queryClient = useQueryClient();
  const [enableEdit, setEnableEdit] = useState(false);
  const { data: navItems = [], isLoading } = useQuery<NavItem[], Error>({
    queryKey: ["nav"],
    queryFn: fetchNav,
  });

  const saveMutation = useMutation<void, Error, NavItem[]>({
    mutationFn: saveNav,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: "nav" });
    },
  });

  const [items, setItems] = useState<NavItem[]>([]);

  useEffect(() => {
    if (navItems.length) {
      setItems(navItems);
    }
  }, [navItems]);

  const moveItem = (
    fromIndex: number,
    toIndex: number,
    parentId: number | null
  ) => {
    const findParentArray = (
      items: NavItem[],
      parentId: number | null
    ): { array: NavItem[]; parent: NavItem | null } | null => {
      if (parentId === null) return { array: items, parent: null }; // Top-level

      for (const item of items) {
        if (item.id === parentId)
          return { array: item.children || [], parent: item };
        if (item.children) {
          const found = findParentArray(item.children, parentId);
          if (found) return found;
        }
      }
      return null;
    };

    const updatedItems = [...items];
    const parentData = findParentArray(updatedItems, parentId);

    if (!parentData) return;

    const { array: parentArray, parent } = parentData;

    if (fromIndex < 0 || fromIndex >= parentArray.length || toIndex < 0) return;

    const [movedItem] = parentArray.splice(fromIndex, 1);
    parentArray.splice(toIndex, 0, movedItem);

    console.log({
      fromIndex,
      toIndex,
      parentId,
      parentArray,
      movedItem,
      parent,
    });

    setItems(updatedItems);

    // Track reorder action
    trackReorder(movedItem.id, fromIndex, toIndex);
  };

  const updateNavItem = (id: number, newTitle?: string) => {
    const updateItem = (items: NavItem[]): NavItem[] =>
      items.map((item) =>
        item.id === id
          ? {
              ...item,
              title: newTitle !== undefined ? newTitle : item.title,
              visible: newTitle !== undefined ? item.visible : !item.visible,
            }
          : item.children
          ? { ...item, children: updateItem(item.children) } // Recursively update children
          : item
      );

    setItems(updateItem(items));
  };

  const saveChanges = () => {
    saveMutation.mutate(items, {
      onSuccess() {
        toast.success("updated successfully", { toastId: "update_nav" });
      },
    });
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <DndProvider backend={HTML5Backend}>
        <div>
          <div className="flex justify-between items-center px-5 py-8 border-b mb-5">
            <div className="flex items-center gap-2">
              {CloseMobileMenu ? (
                <IconButton onClick={CloseMobileMenu}>
                  <ArrowBack />
                </IconButton>
              ) : null}
              <p className="capitalize text-xl">menu</p>
            </div>
            {enableEdit ? (
              <div className="flex gap-x-3">
                {CloseMobileMenu ? null : (
                  <button onClick={() => setEnableEdit(false)}>
                    <CancleIcon />
                  </button>
                )}
                <button onClick={saveChanges}>
                  <SaveIcon />
                </button>
              </div>
            ) : (
              <button onClick={() => setEnableEdit(true)}>
                <SettingsIcon />
              </button>
            )}
          </div>
          <List className="[&>li]:bg-grey-100 space-y-3 !px-3">
            {items.map((item, index) => (
              <NavItemComponent
                key={item.id}
                item={item}
                index={index}
                level={1}
                parentId={null}
                moveItem={moveItem}
                updateNavItem={updateNavItem}
                enableEdit={enableEdit}
              />
            ))}
          </List>
        </div>
      </DndProvider>

      {CloseMobileMenu && enableEdit ?  (
        <button className="text-red-500 text-center w-full py-5 text-lg font-semibold" onClick={() => setEnableEdit(false)}>
          cancel
        </button>
      ):null}
    </div>
  );
};

export default Navigation;
