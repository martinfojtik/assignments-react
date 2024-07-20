import { PlusIcon } from "@radix-ui/react-icons";
import React, { useState } from "react";
import styled from "styled-components";
import { Form } from "./form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { config } from "../config";
import { refetchTodos } from "./hooks/hooks";

const StyledDiv = styled.header`
    display: flex;

    button {
        all: unset;

        width: 25px;
        height: 25px;

        background-color: ${(props) => props.theme.colors.grass9};
        border: 1px solid;
        border-color: ${(props) => props.theme.colors.olive9};
        border-radius: 50%;

        color: #fff;
    }
`;

type HeaderProps = {
    children: React.ReactNode;
    onItemAdd: (label: string) => void;
};

export const Header = (props: HeaderProps) => {
    const { children } = props;
    const [isFormVisible, setIsFormVisible] = useState(false);
    const queryClient = useQueryClient();

    // TODO: move to hooks.ts
    const addTodo = useMutation({
        mutationFn: async ({label}: {label:string}) => {
            const response = await fetch(`${config.apiUrl}/items`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({label}),
            })

            if (!response.ok) {
                throw new Error("Failed to add item");
            }

            return true
        },
        onSuccess: () => {
            setIsFormVisible(false);
            refetchTodos(queryClient);
        }
    });

    return (
        <StyledDiv>
            <h1>{children}</h1>

            {isFormVisible ? (
                <div>
                    <Form
                        initialValue=""
                        onSubmit={label => {
                            addTodo.mutate({label})
                        }}
                        onCancel={() => setIsFormVisible(false)}
                    />

                    {addTodo.isError ? (
                        <div>An error occurred: {addTodo.error.message}</div>
                    ) : null}
                </div>

            ) : (
                <button onClick={() => {
                    addTodo.reset();
                    setIsFormVisible(true);
                }}><PlusIcon /></button>
            )}
        </StyledDiv>
    );
};
