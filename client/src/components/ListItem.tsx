import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import React, { useState } from "react";
import styled from "styled-components";

import { Checkbox } from "./Checkbox";
import { Form } from "./form";

const StyledDiv = styled.div`
    display: flex;
    align-items: center;
`;

const Label = styled.label`
    margin-left: 15px;
`;

export type LiteeItemProp = {
    label: string;
    isDone: boolean;
    onItemLabelEdit: (label: string) => void;
    onItemDoneToggle: (isDone: boolean) => void;
    onItemDelete: () => void;
};

export const ListItem = (props: LiteeItemProp) => {
    const { label, isDone, onItemLabelEdit, onItemDoneToggle, onItemDelete } = props;
    const [isEditing, setIsEditing] = useState(false);

    return (
        <StyledDiv>
            <Checkbox checked={isDone} onCheckedChange={onItemDoneToggle} />
            {isEditing ? (
                <Form
                    onSubmit={newLabel => {
                        onItemLabelEdit(newLabel);
                        setIsEditing(false);
                    }}
                    initialValue={label}
                    onCancel={() => setIsEditing(false)}
                />
            ) : (
                <Label>{label}</Label>
            )}
            <div>
                {!isEditing && (<button onClick={() => setIsEditing(true)}>
                    <Pencil1Icon />
                </button>)}

                <button onClick={() => onItemDelete()}>
                    <TrashIcon />
                </button>
            </div>
        </StyledDiv>
    );
};
