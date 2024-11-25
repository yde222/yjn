import { type TaskResDto } from '@pims-frontend/apis/lib/features/pms/task/response/TaskResDto';

export type TaskTreeNode = TaskResDto & {
  children?: TaskTreeNode[];
};

export function buildTaskTree(
  tasks: TaskResDto[],
  searchText: string = '',
): TaskTreeNode[] {
  const taskMap = new Map<number, TaskTreeNode>();

  // Initialize the task map with all tasks
  tasks.forEach((task) => {
    taskMap.set(task.tskUid, { ...task, children: [] });
  });

  let filteredTasks: TaskTreeNode[];

  if (searchText === '') {
    // No filtering, include all tasks
    filteredTasks = Array.from(taskMap.values());
  } else {
    // Initialize includedTaskIds set
    const includedTaskIds = new Set<number>();

    // Find tasks whose tskNm includes searchText and include their ancestors
    taskMap.forEach((task) => {
      if (task.tskNm.includes(searchText)) {
        let currentTask: TaskTreeNode | null | undefined = task;
        while (currentTask) {
          if (!includedTaskIds.has(currentTask.tskUid)) {
            includedTaskIds.add(currentTask.tskUid);
            if (currentTask.parTskUid && currentTask.parTskUid !== 0) {
              currentTask = taskMap.get(currentTask.parTskUid);
            } else {
              currentTask = null;
            }
          } else {
            // Already processed this task
            break;
          }
        }
      }
    });

    // Filter tasks to only include those in includedTaskIds
    filteredTasks = Array.from(taskMap.values()).filter((task) =>
      includedTaskIds.has(task.tskUid),
    );
  }

  // Build a new task map with filtered tasks
  const filteredTaskMap = new Map<number, TaskTreeNode>();
  filteredTasks.forEach((task) => {
    filteredTaskMap.set(task.tskUid, task);
    task.children = [];
  });

  const roots: TaskTreeNode[] = [];

  // Build the tree structure with filtered tasks
  filteredTasks.forEach((taskNode) => {
    const parentUid = taskNode.parTskUid;
    if (parentUid !== null && parentUid !== undefined && parentUid !== 0) {
      const parentNode = filteredTaskMap.get(parentUid);
      if (parentNode) {
        parentNode.children!.push(taskNode);
      } else {
        // Parent not in filtered tasks; consider as root
        roots.push(taskNode);
      }
    } else {
      // No parent; this is a root node
      roots.push(taskNode);
    }
  });

  // Function to assign wbsNo and depth recursively
  const assignWbsNoAndDepth = (
    nodes: TaskTreeNode[],
    parentWbsNo: string,
    depth: number,
  ) => {
    nodes.forEach((node, index) => {
      node.depth = depth;
      node.parentWbsNo = parentWbsNo;

      // Assign wbsNo based on parentWbsNo and index
      node.wbsNo = parentWbsNo ? `${parentWbsNo}.${index + 1}` : `${index + 1}`;

      if (node.children && node.children.length > 0) {
        assignWbsNoAndDepth(node.children, node.wbsNo, depth + 1);
      }
    });
  };

  // Start assigning wbsNo and depth from root nodes
  assignWbsNoAndDepth(roots, '', 1);

  return roots;
}

export function getMaxDepth(nodes: TaskTreeNode[]): number {
  let maxDepth = 0;

  const traverse = (node: TaskTreeNode, currentDepth: number) => {
    if (currentDepth > maxDepth) {
      maxDepth = currentDepth;
    }
    if (node.children) {
      node.children.forEach((child) => traverse(child, currentDepth + 1));
    }
  };

  nodes.forEach((node) => traverse(node, 1));

  return maxDepth;
}

export function getExpandFromTree(
  nodes: TaskTreeNode[],
  level: number,
): Record<string, boolean> {
  const expandMap: Record<string, boolean> = {};

  const traverse = (node: TaskTreeNode, currentDepth: number) => {
    if (currentDepth < level) {
      expandMap[node.tskUid] = true;
    }
    if (node.children) {
      node.children.forEach((child) => traverse(child, currentDepth + 1));
    }
  };

  nodes.forEach((node) => traverse(node, 1));

  return expandMap;
}
