class HomeRenovation {
  constructor(budget) {
    this.budget = budget;
    this.tasks = [];
    this.completedTasks = [];
  };

  addTask(description, cost, priority) {

    if (cost > this.budget) {
      return `Not enough budget to add '${description}' task.`;
    }

    this.tasks.push({ description, cost, priority });
    this.budget -= cost;

    return `The task '${description}' has been successfully added to the renovation plan.`;
  }

  markTaskAsCompleted(description) {
    const indexofTask = this.tasks.findIndex(task => task.description === description);

    if (indexofTask == -1) {
      throw new Error(`Task '${description}' not found in the renovation plan.`);
    }

    //here i am removing the task from the tasks
    let task = this.tasks.splice(indexofTask, 1);
    // Adding the task to the completedTasks
    this.completedTasks.push(task);

    return `The task '${description}' has been successfully completed.`;
  }

  getPriorityTasksCount(minimalPriority) {
    //minimalPriority is a number
    if (minimalPriority <= 0) {
      return "The priority cannot be zero or negative.";
    }

    const priorityTasks = this.tasks.filter(task => task.priority >= minimalPriority);
    const priorityTasksCount = priorityTasks.length

    if (priorityTasksCount == 0) {
      return `No tasks found with priority ${minimalPriority} or higher.`;
    }

    return `You have ${priorityTasksCount} tasks to prioritize.`;
  }

  renovationSummary() {
    if (this.completedTasks.length == 0) {
      throw new Error("No tasks have been completed yet!");
    }

    const result = [
      `Budget left $${this.budget}.`,
      `You have completed ${this.completedTasks.length} tasks.`,
      `Pending tasks in the renovation plan:`
    ];

    this.tasks.forEach(task => {
      result.push(`${task.description} - Cost: ${task.cost}, Priority: ${task.priority}`);
    });

    return result.join('\n');
  }
}

const renovation = new HomeRenovation(10000);
console.log(renovation.addTask("Paint walls", 1500, 2)); 
console.log(renovation.addTask("Install new windows", 5000, 1)); 
console.log(renovation.markTaskAsCompleted("Paint walls")); 
console.log(renovation.renovationSummary());


