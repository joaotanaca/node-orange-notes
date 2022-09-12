import { Subtask } from "@models/Subtasks";

export default function (subtasks: Subtask[]) {
    const qtdChecked = subtasks.reduce((current, subtask) => {
        if (subtask.checked) {
            return current + 1;
        } else {
            return current;
        }
    }, 0);

    return qtdChecked / subtasks.length || 0;
}
