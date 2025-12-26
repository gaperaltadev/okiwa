"use client";

import { FirebaseUser } from "@/app/api/user/route";
import { Delete } from "@mui/icons-material";
import {
  Box,
  Card,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { MouseEvent, useCallback, useEffect, useState } from "react";
import CreateUserModal from "../../modals/CreateUserModal/CreateUserModal";
import DeleteUserModal from "../../modals/DeleteUserModal/DeleteUserModal";
import PageHeader from "@/app/frontend/shared/components/PageHeader/PageHeader";
import { UsersApi } from "../..";

const UsersPage = () => {
  const [users, setUsers] = useState<FirebaseUser[]>();
  const [createUserModalState, setCreateUserModalState] = useState<{
    isOpen: boolean;
  }>({
    isOpen: false,
  });

  const [deleteUserModalState, setDeleteUserModalState] = useState<{
    isOpen: boolean;
    data?: FirebaseUser;
  }>({
    isOpen: false,
  });

  const fetchUsers = useCallback(async () => {
    const response = await UsersApi.getUsers();
    if (response.status === 200) {
      const { users } = response.data;
      setUsers(users);
    }
  }, []);

  useEffect(() => {
    if (!users) {
      fetchUsers();
    }
  }, [fetchUsers, users]);

  const closeCreateUserModal = useCallback(
    () => setCreateUserModalState({ isOpen: false }),
    []
  );

  const openCreateUserModal = useCallback(
    () => setCreateUserModalState({ isOpen: true }),
    []
  );

  const handleCloseDeleteUserModal = useCallback(() => {
    setDeleteUserModalState({ isOpen: false });
  }, []);

  const openDeleteUserModal = useCallback(
    (user: FirebaseUser) => (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      setDeleteUserModalState({ isOpen: true, data: user });
    },
    []
  );

  return (
    <Box className="flex flex-col gap-6">
      <PageHeader
        title="Usuarios"
        subtitle="Gestiona los usuarios de la aplicación"
        action={openCreateUserModal}
        actionTitle="Crear usuario"
      />
      <Box>
        <Card variant="outlined" className="!rounded-2xl">
          <Table>
            <TableHead className="bg-gray-100">
              <TableRow>
                <TableCell>Email</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Verificado</TableCell>
                <TableCell>Deshabilitado</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users?.map((user) => (
                <TableRow key={user.uid}>
                  <TableCell>{user.email || "N/A"}</TableCell>
                  <TableCell>{user.displayName || "N/A"}</TableCell>
                  <TableCell>{user.emailVerified ? "Sí" : "No"}</TableCell>
                  <TableCell>{user.disabled ? "Sí" : "No"}</TableCell>
                  <TableCell>
                    <IconButton onClick={openDeleteUserModal(user)}>
                      <Delete color="error" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </Box>
      <CreateUserModal
        isOpen={createUserModalState.isOpen}
        onClose={closeCreateUserModal}
        handleSuccess={fetchUsers}
      />
      <DeleteUserModal
        isOpen={deleteUserModalState.isOpen}
        onClose={handleCloseDeleteUserModal}
        user={deleteUserModalState.data}
        handleSuccess={fetchUsers}
      />
    </Box>
  );
};

export default UsersPage;
