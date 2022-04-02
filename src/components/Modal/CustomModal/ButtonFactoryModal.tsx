import { IconLogo } from '@assets/icons';
import { theme } from '@styles/theme';
import React, { useState } from 'react';
import styled from 'styled-components';

import Button from '@components/common/Button';
import Input from '@components/common/Input';

const colorPickers = [
    {
        background: theme.color.black_900,
        color: theme.color.white,
    },
    {
        background: theme.color.violet,
        color: theme.color.white,
    },
    {
        background: theme.color.tomato,
        color: theme.color.white,
    },
    {
        background: theme.color.yellow,
        color: theme.color.black_700,
    },
];

function ButtonFactoryModal() {
    const [selectedColor, setSelectedColor] = useState(colorPickers[0].color);
    const [selectedBackground, setSelectedBackground] = useState(
        colorPickers[0].background,
    );
    const [text, setText] = useState('Buy me a Coffee');

    const onChangeColorPick = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {
            target: {
                dataset: { background, color },
            },
        } = event;

        setSelectedBackground(background ?? '');
        setSelectedColor(color ?? '');
    };

    const onInputText = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {
            target: { value },
        } = event;

        setText(value);
    };

    return (
        <Container>
            <div className="button-factory-wrapper">
                <div className="button-preview-wrapper">
                    <div className="button-preview">
                        <StyledButton
                            background={selectedBackground}
                            fontColor={selectedColor}
                        >
                            <IconLogo />
                            {text}
                        </StyledButton>
                    </div>
                </div>
                <div className="button-color-picker-wrapper">
                    {colorPickers.map((picker) => (
                        <React.Fragment key={picker.background}>
                            <input
                                type="radio"
                                value={picker.background}
                                name="color-picker"
                                className="color-picker"
                                id={picker.background}
                                data-background={picker.background}
                                data-color={picker.color}
                                onChange={onChangeColorPick}
                            />
                            <ButtonColorPicker
                                className="color-picker-option"
                                background={picker.background}
                                color={picker.color}
                                htmlFor={picker.background}
                            />
                        </React.Fragment>
                    ))}
                </div>
            </div>
            <div className="preview-input-wrapper">
                <Input
                    className="preview-input"
                    value={text}
                    onChange={onInputText}
                />
                <Button>버튼생성하기</Button>
            </div>
        </Container>
    );
}

const Container = styled.div`
    padding: 3rem;
    background-color: ${({ theme }) => theme.color.white};
    z-index: 11;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    border-radius: 1rem;

    .button-factory-wrapper {
        width: 100%;
        height: 15rem;
        border-radius: 0.5rem;
        background-color: ${({ theme }) => theme.color.black_700};
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        padding: 1rem;
    }

    .button-preview-wrapper {
        display: flex;
        align-items: center;
        flex: 1;
    }

    .button-color-picker-wrapper {
        width: 100%;
        display: flex;

        gap: 1rem;
    }

    input.color-picker {
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
    }

    .preview-input-wrapper {
        width: 100%;
        display: flex;
        gap: 1rem;
    }

    .preview-input {
        flex: 1;
    }
`;

const StyledButton = styled.div<{ background: string; fontColor: string }>`
    background-color: ${({ background }) => background};
    color: ${({ fontColor }) => fontColor};
    font-size: 1.375rem;
    padding: 1rem 2rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 600;
    border-radius: 1rem;
    cursor: default;

    svg {
        path {
            fill: ${({ fontColor }) => fontColor};
        }
        width: 1.75rem;
        height: 1.75rem;
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

export default ButtonFactoryModal;
