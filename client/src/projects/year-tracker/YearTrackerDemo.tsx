import { useState, useEffect } from "react";
import { Info, Plus, Pencil, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import "./year-tracker.css";

interface ColorCode {
  id: string;
  name: string;
  hex: string;
}

interface DayData {
  [key: string]: string | null; // "month-day" -> colorId
}

interface Track {
  id: string;
  name: string;
  year: number;
  colorCodes: ColorCode[];
  dayData: DayData;
}

const MONTH_NAMES_SHORT = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
const DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const isLeapYear = (year: number) => {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};

const YearTrackerDemo = () => {
  const currentYear = new Date().getFullYear();
  
  const [tracks, setTracks] = useState<Track[]>(() => {
    const saved = localStorage.getItem("year-tracker-tracks");
    if (saved) return JSON.parse(saved);
    return [
      {
        id: "1",
        name: "Mood",
        year: currentYear,
        colorCodes: [
          { id: "1", name: "Happy", hex: "#4ade80" },
          { id: "2", name: "Sad", hex: "#60a5fa" },
          { id: "3", name: "Neutral", hex: "#fbbf24" },
        ],
        dayData: {},
      },
    ];
  });

  const [activeTrackId, setActiveTrackId] = useState<string>(tracks[0]?.id || "");
  const [selectedColorId, setSelectedColorId] = useState<string | null>(null);
  const [showInfo, setShowInfo] = useState(false);
  
  // Modal states
  const [newTrackName, setNewTrackName] = useState("");
  const [newColorName, setNewColorName] = useState("");
  const [newColorHex, setNewColorHex] = useState("#89eecc");
  const [editColorId, setEditColorId] = useState<string | null>(null);
  const [editColorName, setEditColorName] = useState("");
  const [editColorHex, setEditColorHex] = useState("");
  const [editTrackId, setEditTrackId] = useState<string | null>(null);
  const [editTrackName, setEditTrackName] = useState("");
  const [deleteTrackId, setDeleteTrackId] = useState<string | null>(null);
  const [deleteColorId, setDeleteColorId] = useState<string | null>(null);
  
  const [showNewTrackDialog, setShowNewTrackDialog] = useState(false);
  const [showNewColorDialog, setShowNewColorDialog] = useState(false);
  const [showEditColorDialog, setShowEditColorDialog] = useState(false);
  const [showEditTrackDialog, setShowEditTrackDialog] = useState(false);

  useEffect(() => {
    localStorage.setItem("year-tracker-tracks", JSON.stringify(tracks));
  }, [tracks]);

  useEffect(() => {
    if (tracks.length > 0 && !tracks.find(t => t.id === activeTrackId)) {
      setActiveTrackId(tracks[0].id);
    }
  }, [tracks, activeTrackId]);

  const activeTrack = tracks.find((t) => t.id === activeTrackId);

  const getDaysInMonth = (monthIndex: number, year: number) => {
    if (monthIndex === 1 && isLeapYear(year)) return 29;
    return DAYS_IN_MONTH[monthIndex];
  };

  const handleDayClick = (month: number, day: number) => {
    if (!activeTrack || !selectedColorId) return;

    const dataKey = `${month}-${day}`;
    const currentColorId = activeTrack.dayData[dataKey];

    setTracks(
      tracks.map((t) =>
        t.id === activeTrackId
          ? {
              ...t,
              dayData: {
                ...t.dayData,
                [dataKey]: currentColorId === selectedColorId ? null : selectedColorId,
              },
            }
          : t
      )
    );
  };

  const getColorHex = (colorId: string | null | undefined) => {
    if (!colorId || !activeTrack) return "";
    const color = activeTrack.colorCodes.find((c) => c.id === colorId);
    return color?.hex || "";
  };

  const createTrack = () => {
    if (!newTrackName.trim()) return;
    const newTrack: Track = {
      id: Date.now().toString(),
      name: newTrackName.trim(),
      year: currentYear,
      colorCodes: [],
      dayData: {},
    };
    setTracks([...tracks, newTrack]);
    setActiveTrackId(newTrack.id);
    setNewTrackName("");
    setShowNewTrackDialog(false);
  };

  const deleteTrack = () => {
    if (!deleteTrackId) return;
    setTracks(tracks.filter((t) => t.id !== deleteTrackId));
    setDeleteTrackId(null);
  };

  const updateTrack = () => {
    if (!editTrackId || !editTrackName.trim()) return;
    setTracks(
      tracks.map((t) =>
        t.id === editTrackId ? { ...t, name: editTrackName.trim() } : t
      )
    );
    setEditTrackId(null);
    setShowEditTrackDialog(false);
  };

  const addColorCode = () => {
    if (!newColorName.trim() || !activeTrackId) return;
    const newColor: ColorCode = {
      id: Date.now().toString(),
      name: newColorName.trim(),
      hex: newColorHex,
    };
    setTracks(
      tracks.map((t) =>
        t.id === activeTrackId
          ? { ...t, colorCodes: [...t.colorCodes, newColor] }
          : t
      )
    );
    setNewColorName("");
    setNewColorHex("#89eecc");
    setShowNewColorDialog(false);
  };

  const updateColorCode = () => {
    if (!editColorId || !editColorName.trim() || !activeTrackId) return;
    setTracks(
      tracks.map((t) =>
        t.id === activeTrackId
          ? {
              ...t,
              colorCodes: t.colorCodes.map((c) =>
                c.id === editColorId
                  ? { ...c, name: editColorName, hex: editColorHex }
                  : c
              ),
            }
          : t
      )
    );
    setEditColorId(null);
    setShowEditColorDialog(false);
  };

  const deleteColorCode = () => {
    if (!deleteColorId || !activeTrackId) return;
    setTracks(
      tracks.map((t) =>
        t.id === activeTrackId
          ? {
              ...t,
              colorCodes: t.colorCodes.filter((c) => c.id !== deleteColorId),
              dayData: Object.fromEntries(
                Object.entries(t.dayData).map(([key, value]) => [
                  key,
                  value === deleteColorId ? null : value,
                ])
              ),
            }
          : t
      )
    );
    if (selectedColorId === deleteColorId) {
      setSelectedColorId(null);
    }
    setDeleteColorId(null);
  };

  const openEditColor = (color: ColorCode) => {
    setEditColorId(color.id);
    setEditColorName(color.name);
    setEditColorHex(color.hex);
    setShowEditColorDialog(true);
  };

  const openEditTrack = (track: Track) => {
    setEditTrackId(track.id);
    setEditTrackName(track.name);
    setShowEditTrackDialog(true);
  };

  return (
    <div className="yt-demo-container">
      {/* <div className="yt-header">
        <h1 className="yt-h1">YearTrack</h1>
        <div
          className={`yt-info-icon ${showInfo ? "active" : ""}`}
          onClick={() => setShowInfo(!showInfo)}
        >
          <Info size={20} />
          {showInfo && (
            <div className="yt-tooltip">
              YearTrack is a tool to track your activities throughout the year.
              Click on a color to select it, then click on a day to apply the color!
              Click again to remove the color.
            </div>
          )}
        </div>
      </div> */}

        <div className="yt-table-holder">
          {/* Tab navigation */}
          <div className="yt-tabs">
            <ul className="yt-tab-links">
              {tracks.map((track) => (
                <li
                  key={track.id}
                  className={activeTrackId === track.id ? "active" : ""}
                  onClick={() => setActiveTrackId(track.id)}
                >
                  <a href="#">
                    <span>{track.name}</span>
                    {activeTrackId === track.id && (
                      <div className="yt-track-options">
                        <Pencil
                          size={14}
                          onClick={(e) => {
                            e.stopPropagation();
                            openEditTrack(track);
                          }}
                        />
                        <Trash2
                          size={14}
                          onClick={(e) => {
                            e.stopPropagation();
                            setDeleteTrackId(track.id);
                          }}
                        />
                      </div>
                    )}
                  </a>
                </li>
              ))}
              <li id="newTab" onClick={() => setShowNewTrackDialog(true)}>
                <a href="#">
                  <Plus size={16} />
                </a>
              </li>
            </ul>

            {/* Mobile select */}
            <select
              className="yt-tab-select"
              value={activeTrackId}
              onChange={(e) => {
                if (e.target.value === "new") {
                  setShowNewTrackDialog(true);
                } else {
                  setActiveTrackId(e.target.value);
                }
              }}
            >
              {tracks.map((track) => (
                <option key={track.id} value={track.id}>
                  {track.name}
                </option>
              ))}
              <option value="new">+ New Track</option>
            </select>

            {/* Tab content */}
            <div className="yt-tab-content">
              {activeTrack && (
                <div className="yt-tab-content-inner">
                  {/* Calendar grid - horizontal */}
                  <div className="yt-year-calendar">
                    <div className="yt-empty-corner" />
                    {Array.from({ length: 31 }, (_, i) => (
                      <div key={`day-${i + 1}`} className="yt-day-number-label">
                        {String(i + 1).padStart(2, "0")}
                      </div>
                    ))}
                    {MONTH_NAMES_SHORT.map((month, monthIndex) => (
                      <>
                        <div key={`month-${monthIndex}`} className="yt-month-label">
                          {month}
                        </div>
                        {Array.from({ length: 31 }, (_, dayIndex) => {
                          const day = dayIndex + 1;
                          const maxDays = getDaysInMonth(monthIndex, activeTrack.year);
                          const isPlaceholder = day > maxDays;
                          const dataKey = `${monthIndex + 1}-${day}`;
                          const colorId = activeTrack.dayData[dataKey];

                          return (
                            <div
                              key={`${monthIndex}-${day}`}
                              className={`yt-year-day ${isPlaceholder ? "placeholder" : ""}`}
                              style={{
                                backgroundColor: !isPlaceholder
                                  ? getColorHex(colorId) || undefined
                                  : undefined,
                              }}
                              onClick={() =>
                                !isPlaceholder && handleDayClick(monthIndex + 1, day)
                              }
                            />
                          );
                        })}
                      </>
                    ))}
                  </div>

                  {/* Calendar grid - vertical (mobile) */}
                  <div className="yt-year-calendar-vertical">
                    <div className="yt-empty-corner" />
                    {MONTH_NAMES_SHORT.map((month, i) => (
                      <div key={`vmonth-${i}`} className="yt-month-label">
                        {month}
                      </div>
                    ))}
                    {Array.from({ length: 31 }, (_, dayIndex) => (
                      <>
                        <div key={`vday-${dayIndex}`} className="yt-day-number-label">
                          {String(dayIndex + 1).padStart(2, "0")}
                        </div>
                        {MONTH_NAMES_SHORT.map((_, monthIndex) => {
                          const day = dayIndex + 1;
                          const maxDays = getDaysInMonth(monthIndex, activeTrack.year);
                          const isPlaceholder = day > maxDays;
                          const dataKey = `${monthIndex + 1}-${day}`;
                          const colorId = activeTrack.dayData[dataKey];

                          return (
                            <div
                              key={`v-${monthIndex}-${day}`}
                              className={`yt-year-day ${isPlaceholder ? "placeholder" : ""}`}
                              style={{
                                backgroundColor: !isPlaceholder
                                  ? getColorHex(colorId) || undefined
                                  : undefined,
                              }}
                              onClick={() =>
                                !isPlaceholder && handleDayClick(monthIndex + 1, day)
                              }
                            />
                          );
                        })}
                      </>
                    ))}
                  </div>

                  {/* Color codes panel - desktop */}
                  <div className="yt-year-reference">
                    <div className="yt-color-codes">
                      <h5>Color Codes:</h5>
                      {activeTrack.colorCodes.map((color) => (
                        <div
                          key={color.id}
                          className={`yt-color-code ${
                            selectedColorId === color.id ? "selected" : ""
                          }`}
                          onClick={() => setSelectedColorId(color.id)}
                        >
                          <div className="yt-color-info">
                            <div
                              className="yt-color"
                              style={{ backgroundColor: color.hex }}
                            />
                            <p>{color.name}</p>
                          </div>
                          <div className="yt-color-options">
                            <Pencil
                              size={14}
                              onClick={(e) => {
                                e.stopPropagation();
                                openEditColor(color);
                              }}
                            />
                            <Trash2
                              size={14}
                              onClick={(e) => {
                                e.stopPropagation();
                                setDeleteColorId(color.id);
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                    <hr />
                    <div className="yt-color-code-input">
                      <div className="yt-color-input-row">
                        <input
                          type="color"
                          value={newColorHex}
                          onChange={(e) => setNewColorHex(e.target.value)}
                        />
                        <input
                          type="text"
                          value={newColorName}
                          onChange={(e) => setNewColorName(e.target.value)}
                          placeholder="New Code..."
                          maxLength={25}
                        />
                      </div>
                      <button onClick={addColorCode}>Add</button>
                    </div>
                  </div>

                  {/* Color codes panel - mobile */}
                  <div className="yt-year-reference-horizontal">
                    <div className="yt-horizontal-header">
                      <h6>Color Codes - click to select:</h6>
                      <Plus
                        size={20}
                        onClick={() => setShowNewColorDialog(true)}
                        style={{ cursor: "pointer" }}
                      />
                    </div>
                    <div className="yt-color-codes-horizontal">
                      {activeTrack.colorCodes.map((color) => (
                        <div
                          key={color.id}
                          className={`yt-color-code-horizontal ${
                            selectedColorId === color.id ? "selected" : ""
                          }`}
                          onClick={() => setSelectedColorId(color.id)}
                        >
                          <div
                            className="yt-color"
                            style={{ backgroundColor: color.hex }}
                          />
                          <span
                            onClick={(e) => {
                              e.stopPropagation();
                              openEditColor(color);
                            }}
                          >
                            {color.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

      {/* Dialogs */}
      <Dialog open={showNewTrackDialog} onOpenChange={setShowNewTrackDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New Track</DialogTitle>
          </DialogHeader>
          <input
            type="text"
            value={newTrackName}
            onChange={(e) => setNewTrackName(e.target.value)}
            placeholder="Track Name"
            maxLength={50}
            className="yt-modal-input"
          />
          <div className="yt-modal-buttons">
            <button onClick={() => setShowNewTrackDialog(false)}>Cancel</button>
            <button onClick={createTrack} className="primary">Create Track</button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showNewColorDialog} onOpenChange={setShowNewColorDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New Color Code</DialogTitle>
          </DialogHeader>
          <div className="yt-color-input-row">
            <input
              type="color"
              value={newColorHex}
              onChange={(e) => setNewColorHex(e.target.value)}
            />
            <input
              type="text"
              value={newColorName}
              onChange={(e) => setNewColorName(e.target.value)}
              placeholder="New Code..."
              maxLength={25}
              className="yt-modal-input"
            />
          </div>
          <div className="yt-modal-buttons">
            <button onClick={() => setShowNewColorDialog(false)}>Cancel</button>
            <button onClick={addColorCode} className="primary">Done</button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showEditColorDialog} onOpenChange={setShowEditColorDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modify Color Code</DialogTitle>
          </DialogHeader>
          <div className="yt-color-input-row">
            <input
              type="color"
              value={editColorHex}
              onChange={(e) => setEditColorHex(e.target.value)}
            />
            <input
              type="text"
              value={editColorName}
              onChange={(e) => setEditColorName(e.target.value)}
              placeholder="Edit Code..."
              maxLength={25}
              className="yt-modal-input"
            />
          </div>
          <div className="yt-modal-buttons">
            <button
              onClick={() => setDeleteColorId(editColorId)}
              className="danger"
            >
              Delete
            </button>
            <button onClick={updateColorCode} className="primary">Done</button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showEditTrackDialog} onOpenChange={setShowEditTrackDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Track</DialogTitle>
          </DialogHeader>
          <input
            type="text"
            value={editTrackName}
            onChange={(e) => setEditTrackName(e.target.value)}
            placeholder="Track Name"
            maxLength={50}
            className="yt-modal-input"
          />
          <div className="yt-modal-buttons">
            <button onClick={() => setShowEditTrackDialog(false)}>Cancel</button>
            <button onClick={updateTrack} className="primary">Save Changes</button>
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleteTrackId} onOpenChange={() => setDeleteTrackId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Delete Track</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this track? This will permanently
              remove the track and all its associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={deleteTrack} className="bg-destructive text-destructive-foreground">
              Delete Track
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={!!deleteColorId} onOpenChange={() => setDeleteColorId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Delete</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this color? This will also remove
              it from any days it's applied to.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={deleteColorCode} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default YearTrackerDemo;