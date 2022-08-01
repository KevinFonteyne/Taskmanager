var regularIcon = "fa-solid fa-star";
var solidIcon = "fa-regular fa-star";
var isImportant = false;

// class Task {
//     constructor(title, description, dueDate, dueTime, color, emoji, location, status, notifications) {
//         this.title= title;
//         this.description= description;
//         this.dueDate= dueDate;
//         this.dueTime= dueTime;
//         this.color= color;
//         this.emoji= emoji;
//         this.location= location;
//         this.status= status;
//         this.notifications= notifications;
//     }
// }
function toggleImportant() {
    console.log('Icon clicked');
    if (!isImportant) {
        // change to important
        $('#iImportant').removeClass(solidIcon).addClass(regularIcon);
        isImportant = true;
    }
    else {
        //change to not important
        $('#iImportant').removeClass(regularIcon).addClass(solidIcon);
        isImportant = false;
    }
}
function saveTask() {
    // console.log(newTask);
    let important = $('#iImportant').val();
    let title = $("#txtTitle").val();
    let description = $("#txtDescription").val();
    let dueDate = $("#selDueDateTime").val();
    // let dueTime = $("#selDueTime").val;
    let color = $("#selColor").val();
    let emoji = $("#selEmoji").val();
    let location = $("#txtLocation").val();
    let status = $("#selStatus").val();
    let notifications = $("#chkNotifications").prop("checked");
    // creating task object
    let task = new Task(isImportant, title, description, dueDate, color, emoji, location, status, notifications)
    // send the task object to the server
    $.ajax({
        type: "POST",
        url: "https://fsdiapi.azurewebsites.net/api/tasks/",
        data: JSON.stringify(task),
        contentType: "application/json",
        success: function (res) {
            console.log("Server says", res);
        },
        error: function (errorDetails) {
            console.log("Error saving tasks", errorDetails);
        }

    });

    displayTask(task);
}

function displayTask(task) {
    let syntax = `
    <div class="task" style="border: 2px solid ${task.color};">
        <i class="fa-regular fa-star"></i>
        <div class="info">    
            <h3>${task.title}</h3>
            <p>${task.description}</p>
        </div>

        <label class="dueDate">${task.dueDate}</label>
        <label class="location">${task.location}</label>
        <label class="status">${task.status}</label>  
    </div>
    `;

    $("#pendingTasks").append(syntax);
}
function testRequest() {
    $.ajax({
        type: "GET",
        url: "https://fsdiapi.azurewebsites.net/",
        success: function (res) {
            console.log("Server says", res);
        },
        error: function (errorDetails) {
            console.log("Error", errorDetails);
        }
    })
}
function fetchTasks() {
    $.ajax({
        type: "GET",
        url: "https://fsdiapi.azurewebsites.net/api/tasks",
        success: function (res) {
            let tasks = JSON.parse(res);
            for (let i = 0; i < tasks.length; i++) {
                let task = tasks[i];
                if (task.name == "Kevin") {
                    displayTask(task);
                }
            }
        },
        error: function (errorDetails) {
            console.log("Error", errorDetails);
        }
    })
}

function init() {
    console.log('Task Manager Page')
    // assigns events
    $("#iImportant").click(toggleImportant);
    $("#btnSave").click(saveTask);
    // load initial data
    fetchTasks();
}

window.onload = init;