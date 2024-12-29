import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from "react-native";

interface Task {
  id: string;
  text: string;
}

export default function HomeScreen() {
  const [task, setTask] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState<string>("");

  // タスクを追加する
  const addTask = () => {
    if (task.trim()) {
      setTasks([...tasks, { id: Date.now().toString(), text: task }]);
      setTask("");
    }
  };

  // タスクを削除する
  const deleteTask = (id: string) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  // タスクを編集状態にする
  const startEditing = (id: string, currentText: string) => {
    setEditingTaskId(id);
    setEditingText(currentText);
  };

  // 編集内容を保存する
  const saveEdit = () => {
    setTasks(tasks.map((t) => (t.id === editingTaskId ? { ...t, text: editingText } : t)));
    setEditingTaskId(null);
    setEditingText("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo App</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a new task..."
          value={task}
          onChangeText={setTask}
        />
        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskContainer}>
            {editingTaskId === item.id ? (
              // 編集中のUI
              <TextInput
                style={[styles.input, { flex: 1, marginRight: 10 }]}
                value={editingText}
                onChangeText={setEditingText}
                onSubmitEditing={saveEdit}
                autoFocus
              />
            ) : (
              // 通常表示のUI
              <Text style={styles.taskText}>{item.text}</Text>
            )}
            {editingTaskId === item.id ? (
              // 編集中の保存ボタン
              <TouchableOpacity style={styles.saveButton} onPress={saveEdit}>
                <Text style={styles.saveButtonText}>✔️</Text>
              </TouchableOpacity>
            ) : (
              // 通常時の編集と削除ボタン
              <>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => startEditing(item.id, item.text)}
                >
                  <Text style={styles.editButtonText}>✏️</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deleteTask(item.id)}>
                  <Text style={styles.deleteButton}>🗑️</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#fff",
  },
  addButton: {
    backgroundColor: "#007BFF",
    marginLeft: 10,
    padding: 10,
    borderRadius: 5,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 18,
  },
  taskContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  taskText: {
    fontSize: 16,
    flex: 1,
  },
  deleteButton: {
    fontSize: 18,
    color: "#ff5c5c",
    marginLeft: 10,
  },
  editButton: {
    marginLeft: 10,
  },
  editButtonText: {
    fontSize: 18,
    color: "#007BFF",
  },
  saveButton: {
    marginLeft: 10,
  },
  saveButtonText: {
    fontSize: 18,
    color: "#28a745",
  },
});
