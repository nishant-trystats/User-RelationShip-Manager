import React, { useState } from "react";
import type { FormEvent } from "react";
import type  { IUser } from "../../types";
import { api } from "../../api/api";

interface UserFormProps {
  refresh: boolean;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserForm: React.FC<UserFormProps> = ({ refresh, setRefresh }) => {
  const [formData, setFormData] = useState<IUser>({
    username: "",
    age: 0,
    hobbies: [],
    friends: [],
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "age" ? Number(value) : value,
    }));
  };

  const handleArrayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value.split(",").map((v) => v.trim()).filter(Boolean),
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.createUser(formData);
      alert("✅ User created!");
      setFormData({ username: "", age: 0, hobbies: [], friends: [] });
      setRefresh(!refresh);
    } catch (err) {
      alert("❌ Error creating user");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
  const id = prompt("Enter user ID to delete:");
  if (!id) return;
  try {
    await api.deleteUser(id);
    alert("User deleted");
    setRefresh(!refresh);
  } catch (err) {
    alert("First remove all connection or relations.");
  }
};

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        width: "100%",
      }}
    >
      <h3>Create User</h3>
      <label htmlFor="">Username</label>
      <input
        type="text"
        name="username"
        placeholder="Username"
        required
        value={formData.username}
        onChange={handleChange}
      />
      <label htmlFor="">Age</label>
      <input
        type="number"
        name="age"
        placeholder="Age"
        min={0}
        value={formData.age}
        onFocus={(e) => e.target.select()}
        onChange={handleChange}
      />

      <input
        type="text"
        name="hobbies"
        placeholder="Hobbies (comma separated)"
        value={formData.hobbies.join(", ")}
        onChange={handleArrayChange}
      />

      <button type="submit" disabled={loading}>
        {loading ? "Saving..." : "Save"}
      </button>
      <button type="button" onClick={handleDelete}>Delete User</button>
    </form>
  );
};

export default UserForm;
