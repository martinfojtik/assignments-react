import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { config } from "../../config";
import type { QueryClient } from "@tanstack/query-core";

type Item = {
    label: string
    isDone: boolean,
    createdAt: number,
    id: number,
}
type Items = Array<Item>;

export const getTodos = () => useQuery<Items>({
    queryKey: [config.todosKey],
    queryFn: async () => {
        const response = await fetch(
            `${config.apiUrl}/items`,
        );
        return await response.json();
    },
});

export const refetchTodos = (queryClient: QueryClient) => {
    queryClient.refetchQueries({ queryKey: [config.todosKey], exact: true });
};

export const useEditMutation = (queryClient: QueryClient) => useMutation({
    mutationFn: async ({ id, label }: { id: number, label: string }) => {
        const response = await fetch(`${config.apiUrl}/items/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ label }),
        });

        if (!response.ok) {
            throw new Error("Failed to edit item");
        }

        return true;
    },
    onSuccess: () => {
        refetchTodos(queryClient);
    },
    onError: (error) => {
        alert(`Failed to edit item: ${error.message}`);
    },
});

export const useDoneMutation = (queryClient: QueryClient) => useMutation({
    mutationFn: async ({ id, isDone }: { id: number, isDone: boolean }) => {
        const response = await fetch(`${config.apiUrl}/items/${id}/done`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ isDone }),
        });

        if (!response.ok) {
            throw new Error("Failed to done/undone item");
        }

        return true;
    },
    onSuccess: () => {
        refetchTodos(queryClient);
    },
    onError: (error) => {
        alert(`Failed to done/undone item: ${error.message}`);
    },
});

export const useDeleteMutation = (queryClient: QueryClient) => useMutation({
    mutationFn: async ({ id }: { id: number }) => {
        const response = await fetch(`${config.apiUrl}/items/${id}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error("Failed to delete item");
        }

        return true;
    },
    onSuccess: () => {
        refetchTodos(queryClient);
    },
    onError: (error) => {
        alert(`Failed to delete item: ${error.message}`);
    },
});