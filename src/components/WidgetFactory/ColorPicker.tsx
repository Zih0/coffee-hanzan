import React from 'react';
import styled from 'styled-components';

interface IColorPicker {
    background: string;
    color: string;
}

interface IColorPickerProps {
    colorPickers: IColorPicker[];
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function ColorPicker({ colorPickers, onChange }: IColorPickerProps) {
    return (
        <>
            {colorPickers.map((picker) => (
                <React.Fragment key={picker.background}>
                    <Input
                        type="radio"
                        value={picker.background}
                        name="color-picker"
                        className="color-picker"
                        id={picker.background}
                        data-background={picker.background}
                        data-color={picker.color}
                        onChange={onChange}
                    />
                    <ButtonColorPicker
                        className="color-picker-option"
                        background={picker.background}
                        color={picker.color}
                        htmlFor={picker.background}
                    />
                </React.Fragment>
            ))}
        </>
    );
}

const Input = styled.input`
    display: none;

    &:checked + label.color-picker-option {
        &:after {
            display: inline-block;
            content: '';
            transform: rotate(45deg);
            height: 8px;
            width: 4px;
            position: absolute;
            top: 8px;
            left: 11px;
            border-bottom: 3.5px solid ${({ theme }) => theme.color.white};
            border-right: 3.5px solid ${({ theme }) => theme.color.white};
        }
    }
`;

const ButtonColorPicker = styled.label<{
    background: string;
    color: string;
}>`
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: ${({ background }) => background};
    color: ${({ color }) => color};
    position: relative;
    cursor: pointer;
`;

export default ColorPicker;
