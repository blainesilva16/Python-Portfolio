import { useState, useEffect, useMemo } from "react";
import { Menu, Trash2, Calendar, Pencil, Star, X, Check, GripVertical } from "lucide-react";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import "./todo-list.css";
import useOutsideClick from "@/hooks/use-outside-click";

interface Task {
  id: string;
  text: string;
  color: string;
  dueDate: string | null;
  isCompleted: boolean;
  isHighlighted: boolean;
  order: number;
}

interface TodoList {
  id: string;
  name: string;
  tasks: Task[];
}

const TodoListDemo = () => {
  const [lists, setLists] = useState<TodoList[]>(() => {
    const saved = localStorage.getItem("todo-lists");
    return saved ? JSON.parse(saved) : [];
  });
  const [activeListId, setActiveListId] = useState<string | null>(null);
  const [newListName, setNewListName] = useState("");
  const [newTaskText, setNewTaskText] = useState("");
  const [taskColor, setTaskColor] = useState("#6e2a9b");
  const [taskDueDate, setTaskDueDate] = useState<Date | undefined>();
  const [showTaskOptions, setShowTaskOptions] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedListIds, setSelectedListIds] = useState<string[]>([]);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editTaskText, setEditTaskText] = useState("");
  const [editTaskColor, setEditTaskColor] = useState("");
  const [editTaskDueDate, setEditTaskDueDate] = useState<Date | undefined>();
  const [editingListId, setEditingListId] = useState<string | null>(null);
  const [editListName, setEditListName] = useState("");
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);

  const handleClickOutside = () => {
    console.log('Clicked outside the input area. Closing or saving...');
    setShowTaskOptions(false); // Example action: hide a dropdown or save the input
  };

  const inputRef = useOutsideClick(handleClickOutside);

  useEffect(() => {
    localStorage.setItem("todo-lists", JSON.stringify(lists));
  }, [lists]);

  const activeList = lists.find((l) => l.id === activeListId);

  const createList = () => {
    if (!newListName.trim()) return;
    const newList: TodoList = {
      id: Date.now().toString(),
      name: newListName.trim(),
      tasks: [],
    };
    setLists([...lists, newList]);
    setNewListName("");
  };

  const deleteSelectedLists = () => {
    if (selectedListIds.length === 0) return;
    if (!confirm(`Delete ${selectedListIds.length} list(s)?`)) return;
    setLists(lists.filter((l) => !selectedListIds.includes(l.id)));
    if (activeListId && selectedListIds.includes(activeListId)) {
      setActiveListId(null);
    }
    setSelectedListIds([]);
  };

  const toggleListSelection = (id: string) => {
    setSelectedListIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const selectList = (id: string) => {
    setActiveListId(id);
    setSidebarOpen(false);
  };

  const addTask = () => {
    if (!newTaskText.trim() || !activeListId) return;
    const newTask: Task = {
      id: Date.now().toString(),
      text: newTaskText.trim(),
      color: taskColor,
      dueDate: taskDueDate ? format(taskDueDate, "yyyy-MM-dd") : null,
      isCompleted: false,
      isHighlighted: false,
      order: activeList?.tasks.length || 0,
    };
    setLists(
      lists.map((l) =>
        l.id === activeListId ? { ...l, tasks: [...l.tasks, newTask] } : l
      )
    );
    setNewTaskText("");
    setTaskDueDate(undefined);
  };

  const deleteTask = (taskId: string) => {
    setLists(
      lists.map((l) =>
        l.id === activeListId
          ? { ...l, tasks: l.tasks.filter((t) => t.id !== taskId) }
          : l
      )
    );
  };

  const toggleTaskComplete = (taskId: string) => {
    setLists(
      lists.map((l) =>
        l.id === activeListId
          ? {
              ...l,
              tasks: l.tasks.map((t) =>
                t.id === taskId ? { ...t, isCompleted: !t.isCompleted } : t
              ),
            }
          : l
      )
    );
  };

  const toggleTaskHighlight = (taskId: string) => {
    setLists(
      lists.map((l) =>
        l.id === activeListId
          ? {
              ...l,
              tasks: l.tasks.map((t) =>
                t.id === taskId ? { ...t, isHighlighted: !t.isHighlighted } : t
              ),
            }
          : l
      )
    );
  };

  const startEditTask = (task: Task) => {
    setEditingTaskId(task.id);
    setEditTaskText(task.text);
    setEditTaskColor(task.color);
    setEditTaskDueDate(task.dueDate ? new Date(task.dueDate) : undefined);
  };

  const saveEditTask = () => {
    if (!editingTaskId) return;
    setLists(
      lists.map((l) =>
        l.id === activeListId
          ? {
              ...l,
              tasks: l.tasks.map((t) =>
                t.id === editingTaskId
                  ? {
                      ...t,
                      text: editTaskText,
                      color: editTaskColor,
                      dueDate: editTaskDueDate
                        ? format(editTaskDueDate, "yyyy-MM-dd")
                        : null,
                    }
                  : t
              ),
            }
          : l
      )
    );
    setEditingTaskId(null);
  };

  const startEditList = (list: TodoList, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingListId(list.id);
    setEditListName(list.name);
  };

  const saveEditList = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && editingListId) {
      setLists(
        lists.map((l) =>
          l.id === editingListId ? { ...l, name: editListName.trim() } : l
        )
      );
      setEditingListId(null);
    }
  };

  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    setDraggedTaskId(taskId);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent, targetTaskId: string) => {
    e.preventDefault();
    if (!draggedTaskId || draggedTaskId === targetTaskId || !activeList) return;

    const draggedIndex = activeList.tasks.findIndex((t) => t.id === draggedTaskId);
    const targetIndex = activeList.tasks.findIndex((t) => t.id === targetTaskId);

    if (draggedIndex === -1 || targetIndex === -1) return;

    const newTasks = [...activeList.tasks];
    const [draggedTask] = newTasks.splice(draggedIndex, 1);
    newTasks.splice(targetIndex, 0, draggedTask);

    setLists(
      lists.map((l) =>
        l.id === activeListId ? { ...l, tasks: newTasks } : l
      )
    );
  };

  const handleDragEnd = () => {
    setDraggedTaskId(null);
  };

  const handleDropOnList = (e: React.DragEvent, targetListId: string) => {
    e.preventDefault();
    if (!draggedTaskId || !activeListId || targetListId === activeListId) return;

    const task = activeList?.tasks.find((t) => t.id === draggedTaskId);
    if (!task) return;

    setLists(
      lists.map((l) => {
        if (l.id === activeListId) {
          return { ...l, tasks: l.tasks.filter((t) => t.id !== draggedTaskId) };
        }
        if (l.id === targetListId) {
          return { ...l, tasks: [...l.tasks, task] };
        }
        return l;
      })
    );
    setDraggedTaskId(null);
  };

//   const ListsPanel = useMemo(
//     () =>
//       ({ isSidebar = false }: { isSidebar?: boolean }) => (
//         <div className="todo-todos-container">
//           <div className="todo-lists-header">
//             <h5>Lists (double-click to edit):</h5>
//             <button
//               className="todo-icon-btn"
//               onClick={deleteSelectedLists}
//               disabled={selectedListIds.length === 0}
//             >
//               <Trash2 size={16} />
//             </button>
//           </div>
//           <div className="todo-categories">
//             {lists.length === 0 ? (
//               <div className="todo-empty-state">
//                 No lists available. Create a new one!
//               </div>
//             ) : (
//               lists.map((list) => (
//                 <div
//                   key={list.id}
//                   className={`todo-category ${activeListId === list.id ? "active" : ""}`}
//                   onClick={() => selectList(list.id)}
//                   onDoubleClick={(e) => startEditList(list, e)}
//                   onDragOver={(e) => e.preventDefault()}
//                   onDrop={(e) => handleDropOnList(e, list.id)}
//                 >
//                   {editingListId === list.id ? (
//                     <input
//                       type="text"
//                       value={editListName}
//                       onChange={(e) => setEditListName(e.target.value)}
//                       onKeyDown={saveEditList}
//                       onBlur={() => setEditingListId(null)}
//                       onClick={(e) => e.stopPropagation()}
//                       autoFocus
//                       className="todo-edit-list-input"
//                     />
//                   ) : (
//                     <div>• {list.name}</div>
//                   )}
//                   <input
//                     type="checkbox"
//                     checked={selectedListIds.includes(list.id)}
//                     onChange={() => toggleListSelection(list.id)}
//                     onClick={(e) => e.stopPropagation()}
//                   />
//                 </div>
//               ))
//             )}
//           </div>
//           {/* <hr /> */}
//           <div className="todo-new-list-input">
//             <input
//               type="text"
//               value={newListName}
//               onChange={(e) => setNewListName(e.target.value)}
//               onMouseDown={(e) => e.stopPropagation()}
//               onClick={(e) => e.stopPropagation()}
//               placeholder="New List..."
//               maxLength={50}
//               onKeyDown={(e) => {
//                 e.stopPropagation();
//                 if (e.key === "Enter") createList();
//               }}
//             />
//             <button onClick={(e) => { e.stopPropagation(); createList(); }}>+</button>
//           </div>
//         </div>
//       ),
//     [
//       lists,
//       activeListId,
//       editingListId,
//       editListName,
//       newListName,
//       selectedListIds,
//       deleteSelectedLists,
//       selectList,
//       startEditList,
//       handleDropOnList,
//       createList,
//     ],
//   );

  return (
    <div className="todo-demo-container">
      <div className="todo-overlay" style={{ display: sidebarOpen ? "block" : "none" }} onClick={() => setSidebarOpen(false)} />
      
      <div className="todo-main">
        {/* <h1 className="todo-h1">To-do List</h1> */}

        {/* Mobile sidebar toggle */}
        {/* <nav className="todo-sidebar-nav">
          <button className="todo-toggle-navbar" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <Menu size={20} />
          </button>
          <div className={`todo-sidebar ${sidebarOpen ? "active" : ""}`}>
            <ListsPanel isSidebar />
          </div>
        </nav> */}

        <div className="todo-divider">
          {/* Lists panel - desktop */}
            {/* <ListsPanel /> */}
            <div className="todo-todos-container">
                <div className="todo-lists-header">
                    <h5>Lists (double-click to edit):</h5>
                    <button
                    className="todo-icon-btn"
                    onClick={deleteSelectedLists}
                    disabled={selectedListIds.length === 0}
                    >
                    <Trash2 size={16} />
                    </button>
                </div>
                <div className="todo-categories">
                    {lists.length === 0 ? (
                    <div className="todo-empty-state">
                        No lists available. Create a new one!
                    </div>
                    ) : (
                    lists.map((list) => (
                        <div
                        key={list.id}
                        className={`todo-category ${activeListId === list.id ? "active" : ""}`}
                        onClick={() => selectList(list.id)}
                        onDoubleClick={(e) => startEditList(list, e)}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => handleDropOnList(e, list.id)}
                        >
                        {editingListId === list.id ? (
                            <input
                            type="text"
                            value={editListName}
                            onChange={(e) => setEditListName(e.target.value)}
                            onKeyDown={saveEditList}
                            onBlur={() => setEditingListId(null)}
                            onClick={(e) => e.stopPropagation()}
                            autoFocus
                            className="todo-edit-list-input"
                            />
                        ) : (
                            <div>• {list.name}</div>
                        )}
                        <input
                            type="checkbox"
                            checked={selectedListIds.includes(list.id)}
                            onChange={() => toggleListSelection(list.id)}
                            onClick={(e) => e.stopPropagation()}
                        />
                        </div>
                    ))
                    )}
                </div>
                {/* <hr /> */}
                <div className="todo-new-list-input">
                    <input
                    type="text"
                    value={newListName}
                    onChange={(e) => setNewListName(e.target.value)}
                    onMouseDown={(e) => e.stopPropagation()}
                    onClick={(e) => e.stopPropagation()}
                    placeholder="New List..."
                    maxLength={50}
                    onKeyDown={(e) => {
                        e.stopPropagation();
                        if (e.key === "Enter") createList();
                    }}
                    />
                    <button onClick={(e) => { e.stopPropagation(); createList(); }}>+</button>
                </div>
            </div>

          {/* Tasks panel */}
            <div className="todo-tasks-inner">
              <h2 className="todo-list-name">
                {activeList ? activeList.name : "Click on a List to see its tasks!"}
              </h2>

              {activeList && (
                <>
                  <div className="todo-task-list">
                    {activeList.tasks.map((task) =>
                      editingTaskId === task.id ? (
                        <div key={task.id} className="todo-item-edit">
                          <input
                            type="color"
                            value={editTaskColor}
                            onChange={(e) => setEditTaskColor(e.target.value)}
                          />
                          <input
                            type="text"
                            value={editTaskText}
                            onChange={(e) => setEditTaskText(e.target.value)}
                          />
                          <Popover>
                            <PopoverTrigger asChild>
                              <button className="todo-date-btn">
                                <Calendar size={14} />
                              </button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <CalendarComponent
                                mode="single"
                                selected={editTaskDueDate}
                                onSelect={setEditTaskDueDate}
                                disabled={(date) => date < new Date()}
                              />
                            </PopoverContent>
                          </Popover>
                          <button onClick={() => setEditingTaskId(null)}>
                            <X size={14} />
                          </button>
                          <button onClick={saveEditTask}>
                            <Check size={14} />
                          </button>
                        </div>
                      ) : (
                        <div
                          key={task.id}
                          className={`todo-item ${draggedTaskId === task.id ? "dragging" : ""}`}
                          draggable
                          onDragStart={(e) => handleDragStart(e, task.id)}
                          onDragOver={(e) => handleDragOver(e, task.id)}
                          onDragEnd={handleDragEnd}
                        >
                          <div className="todo-item-content">
                            <div className="todo-drag-handle">
                              <GripVertical size={16} />
                            </div>
                            <div
                              className="todo-color-dot"
                              style={{ backgroundColor: task.color }}
                            />
                            <input
                              type="checkbox"
                              checked={task.isCompleted}
                              onChange={() => toggleTaskComplete(task.id)}
                            />
                            <p className={task.isCompleted ? "line-through" : ""}>
                              {task.text}
                            </p>
                            {task.dueDate && (
                              <span className="todo-date">
                                Due: {task.dueDate}
                              </span>
                            )}
                          </div>
                          <div className="todo-item-options">
                            <Star
                              size={16}
                              className={task.isHighlighted ? "highlighted" : ""}
                              onClick={() => toggleTaskHighlight(task.id)}
                            />
                            <Pencil
                              size={16}
                              onClick={() => startEditTask(task)}
                            />
                            <Trash2
                              size={16}
                              onClick={() => deleteTask(task.id)}
                            />
                          </div>
                        </div>
                      )
                    )}
                  </div>

                  <div className="todo-add-holder"
                    // When clicking outside the input it sets showTaskOptions to false
                    ref={inputRef}
                  >
                    <input
                      type="text"
                      value={newTaskText}
                      onChange={(e) => setNewTaskText(e.target.value)}
                      placeholder="Add a new task..."
                      maxLength={100}
                      onFocus={() => setShowTaskOptions(true)}                                         
                      onKeyDown={(e) => e.key === "Enter" && addTask()}
                    />
                    {showTaskOptions && (
                      <div className="todo-options-task">
                        <div className="todo-deadline-color">
                          <input
                            type="color"
                            value={taskColor}
                            onChange={(e) => setTaskColor(e.target.value)}
                          />
                          <Popover>
                            <PopoverTrigger asChild>
                              <button className="todo-calendar-icon">
                                <Calendar size={16} />
                              </button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <CalendarComponent
                                mode="single"
                                selected={taskDueDate}
                                onSelect={setTaskDueDate}
                                disabled={(date) => date < new Date()}
                              />
                            </PopoverContent>
                          </Popover>
                          {taskDueDate && (
                            <span className="todo-selected-date">
                              {format(taskDueDate, "MMM d, yyyy")}
                            </span>
                          )}
                        </div>
                        <button onClick={addTask}>Add</button>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          
        </div>
      </div>
    </div>
  );
};

export default TodoListDemo;