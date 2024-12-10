import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar, Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import '../Dashboard/dashboard.css';
import { toast, ToastContainer } from 'react-toastify'; // Import Toast components
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for styling
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton,Paper, Menu, MenuItem, TextField } from '@mui/material';
import { MoreVert, ArrowDownward, ArrowUpward } from '@mui/icons-material';
import { styled } from '@mui/system';
import { DataGrid} from '@mui/x-data-grid';
import '../Dashboard/UserTable.css'
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Make sure to install react-icons

const Sidebar = ({ onMenuSelect }) => (
    <div className="sidebar">
        <button className='sidebar-button' onClick={() => onMenuSelect("viewAll")}>View All Students</button>
        <button className='sidebar-button' onClick={() => onMenuSelect("dashboard")}>Dashboard</button>
        <button className='sidebar-button' onClick={() => onMenuSelect("addStudent")}>Add Students</button>
        <button className='sidebar-button' onClick={() => onMenuSelect("viewClubs")}>View Clubs</button>
        <button className="sidebar-button" onClick={() => onMenuSelect("addClub")}>Add Club</button> {/* New button */}
    </div>  
);

const EditStudentModal = ({ student, onClose, onSave }) => {
    const [firstname, setFirstname] = useState(student.firstname);
    const [lastname, setLastname] = useState(student.lastname);
    const [password, setPassword] = useState(student.password);

    const handleSave = () => {
        onSave({ ...student, firstname, lastname, password });
    };


    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Edit Student</h2>
                <label>First Name</label>
                <input
                    type="text"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                />
                <label>Last Name</label>
                <input
                    type="text"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                />
                <label>Email</label>
                <input type="email" defaultValue={student.email} disabled />
                <label>Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={handleSave}>Save</button>
                <button onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
};
const AddStudentForm = ({ onAdd, onClose }) => {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [image, setImage] = useState(null);
  
    const handleAdd = () => {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|outlook\.com|.*\.in)$/;
      if (!emailRegex.test(email)) {
        setError("Enter a valid email address (e.g., @gmail.com, @outlook.com, or @<anything>.in)");
        return;
      }
  
      if (password !== confirmPassword) {
        setError("Passwords do not match!");
        return;
      }
      setError("");
      const formData = new FormData();
      formData.append("firstname", firstname);
      formData.append("lastname", lastname);
      formData.append("email", email);
      formData.append("password", password);
      if (image) formData.append("image", image);

      onAdd(formData);
      onClose();
    };
  
    return (
       <div className="add-student-form">
      <h2>Add Student</h2>
      <div className="name-fields">
        <div className="name-field">
          <label>First Name</label>
          <input
            type="text"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            required
          />
        </div>
        <div className="name-field">
          <label>Last Name</label>
          <input
            type="text"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            required
          />
        </div>
      </div>
      <div className="email-upload-fields">
        <div className="email-field">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {error && email && !/^[a-zA-Z0-9._%+-]+@(gmail\.com|outlook\.com|.*\.in)$/.test(email) && (
            <p className="error">{error}</p>
          )}
        </div>
        <div className="upload-field">
          <label>Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
      </div>
      <div className="password-fields">
        <div className="password-field">
          <label>Password</label>
          <div className="show-password-container">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="eye-icon1"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>
        <div className="confirm-password-field">
          <label>Confirm Password</label>
          <div className="show-password-container">
            <input
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <span
              className="eye-icon1"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>
      </div>
      {error && <p className="error">{error}</p>}
      <button className="addbutton" onClick={handleAdd}>Add</button>
      <button className="cancelbutton" onClick={onClose}>Cancel</button>
    </div>
  
    );
  };
const Dashboard = () => {
  
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [studentToDelete, setStudentToDelete] = useState(null);
    const [view, setView] = useState("dashboard");
    const [studentsData, setStudentsData] = useState([]);
    const [studentCount, setStudentCount] = useState([20, 18, 15, 10, 22, 28, 17, 26, 12, 25]);
    const [editingStudent, setEditingStudent] = useState(null);
    const [clubsData, setClubsData] = useState([]); 

    const handleAddClub = (formData) => {
      axios.post("http://localhost:8080/addclub", formData, {
          headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
          console.log("Club added successfully:", res.data);
          setClubsData((prevData) => [...prevData, res.data]);
          toast.success("Club added successfully!");
      })
      .catch((error) => {
          toast.error("Error adding club, please try again.");
          console.error("Error adding club:", error);
      });
  };

  const renderAddClub = () => (
      <AddClubForm
          onAdd={handleAddClub}
          onClose={() => setView("viewAll")}
      />
  );
    useEffect(() => {
        if (view === "viewAll") {
            axios.get("https://springbootactivitymanagement-production.up.railway.app/viewall").then((res) => setStudentsData(res.data));
        }
        else if (view === "viewClubs") {
          axios.get("https://springbootactivitymanagement-production.up.railway.app/viewclubs").then((res) => setClubsData(res.data));
      }
    }, [view]);

    const handleAddStudent = (formData) => {
        axios.post("https://springbootactivitymanagement-production.up.railway.app/add", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }, 
        })
        .then((res) => {
            console.log("Add successful:", res.data);
            setStudentsData((prevData) => [...prevData, res.data]);
            toast.success("Added Successfully!");
        })
        .catch((error) => {
            toast.error("An error occurred, please try again");
            console.error("Error adding student:", error);
        });
    };

    const renderAddStudent = () => (
        <AddStudentForm
            onAdd={handleAddStudent}
            onClose={() => setView("viewAll")}
        />
    );

    const dataForBar = {
        labels: ["Event 1", "Event 2", "Event 3", "Event 4", "Event 5", "Event 6", "Event 7", "Event 8", "Event 9", "Event 10"],
        datasets: [
            {
                label: "Number of Students per Event",
                data: studentCount,
                backgroundColor: "#7B68EE",
                borderColor: "#4B0082",
                borderWidth: 1,
            },
        ],
    };
    const registered = studentCount.reduce((acc, num) => acc + num, 0);
    const totalCapacity = 10 * 30;
    const dataForPie = {
        labels: ["Registered", "Unregistered"],
        datasets: [
            {
                data: [registered, totalCapacity - registered],
                backgroundColor: ["#3CB371", "#FF6347"],
                hoverOffset: 4,
            },
        ],
    };
    
    

    const openEditModal = (student) => setEditingStudent(student);
    const closeEditModal = () => setEditingStudent(null);
   const saveStudent = (updatedStudent) => {
    axios.put("https://springbootactivitymanagement-production.up.railway.app/update", updatedStudent)
    .then((res) => {
        console.log("Update successful:", res.data);
        setStudentsData((prevData) =>
            prevData.map((student) =>
                student.email === updatedStudent.email ? updatedStudent : student
            )
        );
        closeEditModal();
        toast.success('UpdatedSuccessfully!');
    })
    .catch((error) => {
        console.error("Error updating student:", error);
        toast.error('Failed to update student. Please try again.');
    });
};


const handleDeleteClick = (student) => {
    setStudentToDelete(student);
    setShowConfirmation(true);
};

const handleConfirmDelete = () => {
    if (studentToDelete) {
        axios.delete("https://springbootactivitymanagement-production.up.railway.app/delete", {
            params: { email: studentToDelete.email }
        }).then((res) => {
            console.log(res.data);
            setStudentsData((prevData) =>
                prevData.filter((student) =>
                    student.email !== studentToDelete.email
                )
            );
            setShowConfirmation(false);
            setStudentToDelete(null);
            toast.error('Deleted Successfully');
        }).catch((error) => {
            console.error("Error deleting student:", error);
            toast.error('Failed to delete student. Please try again.');
        });
    }
};




    const renderDashboard = () => (
        <div className="dashboard-content">
            <div className="card">
                <h2>Student Distribution by Event</h2>
                <div className="chart-container">
                    <Bar data={dataForBar} options={{ responsive: true, maintainAspectRatio: false }} />
                </div>
            </div>
            <div className="card">
                <h2>Event Registration Status</h2>
                <div className="chart-container">
                    <Pie data={dataForPie} options={{ responsive: true, maintainAspectRatio: false }} />
                </div>
            </div>
        </div>
    );

    const ConfirmationModal = ({ onClose, onConfirm }) => (
        <div className="confirmation-overlay">
            <div className="confirmation-content">
                <h2>Are you sure you want to delete this student?</h2>
                <div className="confirmation-buttons">
                    <button  className="confirm-button1" onClick={onConfirm}>Yes</button>
                    <button className="cancel-button1" onClick={onClose} >No</button>
                </div>
            </div>
        </div>
    );

    function UserTable() {
        const [rows, setRows] = useState([]);
        const [page, setPage] = useState(0);
        const [pageSize, setPageSize] = useState(8);
        const [totalStudents, setTotalStudents] = useState(0);
      
        // Fetch data from backend
        const fetchData = async () => {
          try {
            const response = await axios.get("https://springbootactivitymanagement-production.up.railway.app/studentpage", {
              params: {
                page: page,
                limit: pageSize,
              },
            });
            setRows(response.data.students);
            setTotalStudents(response.data.total); // Set total students count for pagination
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
      
        // Load data on page change or page size change
        useEffect(() => {
          fetchData();
        }, [page, pageSize]);
      
        const columns = [
          { field: "email", headerName: "Email", width: 220 },
          { field: "firstname", headerName: "First Name", width: 180 },
          { field: "lastname", headerName: "Last Name", width: 180 },
          { field: "password", headerName: "Password", width: 180 },
          {
            field: "actions",
            headerName: "Actions",
            width: 250,
            renderCell: (params) => (
              <>
                <button onClick={() => openEditModal(params.row)} className="edit-button1">
                  Edit
                </button>
                <button onClick={() => handleDeleteClick(params.row)} className="delete-button1">
                  Delete
                </button>
              </>
            ),
          },
        ];
      
        // Calculate the total number of pages based on total students and page size
        const totalPages = Math.ceil(totalStudents / pageSize);
      
        return (
          <div className="user-table-container">
            <DataGrid
                rows={rows.map((row, index) => ({ ...row, id: index + 1 }))}
                columns={columns}
                pageSize={pageSize}
               pagination={false}  // Disable built-in pagination
               loading={!rows.length}
               disableSelectionOnClick
            />
      
            {/* Pagination controls */}
            <div className="pagination-controls">
              <button
                onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 0))}
                disabled={page === 0}
              >
                Previous
              </button>
              <span>
                Page {page + 1} of {totalPages}
              </span>
              <button
                onClick={() => setPage((prevPage) => (page + 1 < totalPages ? prevPage + 1 : prevPage))}
                disabled={page + 1 >= totalPages}
              >
                Next
              </button>
              {showConfirmation && (
                <ConfirmationModal
                    onClose={() => setShowConfirmation(false)}
                    onConfirm={handleConfirmDelete}
                />
            )}
            </div>
            
          </div>
          
        );
      }
      const AddClubForm = ({ onAdd, onClose }) => {
        const [clubname, setClubname] = useState("");
        const [coordinatorname, setCoordinatorname] = useState("");
        const [description, setDescription] = useState("");
        const [image, setImage] = useState(null);
    
        const handleAdd = () => {
            const formData = new FormData();
            formData.append("clubname", clubname);
            formData.append("coordinatorname", coordinatorname);
            formData.append("description", description);
            if (image) formData.append("image", image);
    
            onAdd(formData);
            onClose();
        };
    
        return (
            <div className="add-club-form">
                <h2>Add Club</h2>
                <label>Club Name</label>
                <input
                    type="text"
                    value={clubname}
                    onChange={(e) => setClubname(e.target.value)}
                    required
                />
                <label>Coordinator Name</label>
                <input
                    type="text"
                    value={coordinatorname}
                    onChange={(e) => setCoordinatorname(e.target.value)}
                    required
                />
                <label>Description</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                <label>Upload Image</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                />
                <div className='button-container'>
                <button className="addbutton" onClick={handleAdd}>Add</button>
                <button  className="cancelbutton "onClick={onClose}>Cancel</button>
                </div>
                
            </div>
        );
    };
    const renderViewClubs = () => (
      <div className="Clubs">
          <div className="Clubs-header">
              <div className="Clubs-title"><p>All Clubs</p></div>
              <p>Explore Our Clubs!</p>
          </div>
          <div className="Clubs-body">
              {clubsData.map((club, index) => (
                  <div className="Clubs-card" key={index} style={{ animationDelay: `${index * 0.1}s` }}>
                      <div className="Clubs-image">
                          <img className="Clubs-image-container" src={`data:image/jpeg;base64,${club.image}`} alt={club.clubName} />
                      </div>
                      <div className="Clubs-description">
                          <div className="Club-name">
                              <p>{club.clubName}</p>
                          </div>
                          <div className="Club-coordinator">
                              <p>Coordinator: {club.coordinatorName}</p>
                          </div>
                          <div className="Club-description-body">
                              <p>{club.description}</p>
                          </div>
                      </div>
                      <button className="view-club-button">View Club</button>
                  </div>
              ))}
          </div>
      </div>
  );
  
  
  
    
    return (
        <div className="dashboard-wrapper">
            <Sidebar onMenuSelect={setView} />
            <div className="content">
                {view === "dashboard" ? renderDashboard() : view === "viewAll" ?<UserTable/>  : 
                    view === "addStudent" ? renderAddStudent() : view==="addClub"? renderAddClub(): view==="viewClubs"?renderViewClubs():null
                }
            </div>
            {editingStudent && (
                <EditStudentModal
                    student={editingStudent}
                    onClose={closeEditModal}
                    onSave={saveStudent}
                />
            )}
              <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        </div>
    );
};

export default Dashboard;
