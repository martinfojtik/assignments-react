import styled from "styled-components";
import { ListItem } from "./ListItem";
import { getTodos, useDeleteMutation, useDoneMutation, useEditMutation } from "./hooks/hooks";
import { useQueryClient } from "@tanstack/react-query";

export const StyledList = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
`;

export const List = () => {
    const queryClient = useQueryClient();
    const {data, isPending, error} = getTodos();
    const editTodo = useEditMutation(queryClient);
    const doneTodo = useDoneMutation(queryClient);
    const deleteTodo = useDeleteMutation(queryClient);

    const sortedTodos =(data || []).sort((a, b) => b.createdAt - a.createdAt).sort((a, b) => Number(a.isDone || 0) - Number(b.isDone || 0))

    const onItemDoneToggle = (id: number) => async (isDone: boolean) => {
        doneTodo.mutate({id, isDone});
    };

    const onItemDelete = (id: number) => async () => {
        deleteTodo.mutate({id});
    };

    const onItemLabelEdit = (id: number) => async (label: string) => {
        editTodo.mutate({id, label});
    };

    return (
        <StyledList>
            {isPending && 'Loading...'}
            {error && 'An error has occurred: ' + error.message}

            <div>
                {sortedTodos.map(({id, label, isDone}) => (
                    <ListItem
                        key={id}
                        label={label}
                        isDone={isDone}
                        onItemDelete={onItemDelete(id)}
                        onItemDoneToggle={onItemDoneToggle(id)}
                        onItemLabelEdit={onItemLabelEdit(id)}
                    />
                ))}
            </div>
        </StyledList>
    )
}