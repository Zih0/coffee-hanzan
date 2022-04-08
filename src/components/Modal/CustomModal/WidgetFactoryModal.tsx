import { theme } from '@styles/theme';
import React, { useState } from 'react';
import styled from 'styled-components';

import CodeSection from '@components/WidgetFactory/CodeSection';
import ColorPicker from '@components/WidgetFactory/ColorPicker';
import Preview from '@components/WidgetFactory/Preview';
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

function WidgetFactoryModal() {
    const [selectedColor, setSelectedColor] = useState(colorPickers[0].color);
    const [selectedBackground, setSelectedBackground] = useState(
        colorPickers[0].background,
    );
    const [text, setText] = useState('Buy me a Coffee');
    const [generated, setGenerated] = useState(false);

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

    const onClickGenerateButton = () => {
        setGenerated(true);
    };

    const onBack = () => {
        setGenerated(false);
    };

    return (
        <Container>
            <div className="button-factory-wrapper">
                {!generated ? (
                    <>
                        <div className="button-preview-wrapper">
                            <Preview
                                selectedBackground={selectedBackground}
                                selectedColor={selectedColor}
                                text={text}
                            />
                        </div>
                        <div className="button-color-picker-wrapper">
                            <ColorPicker
                                colorPickers={colorPickers}
                                onChange={onChangeColorPick}
                            />
                        </div>
                    </>
                ) : (
                    <div className="button-preview-wrapper">
                        <CodeSection
                            selectedBackground={selectedBackground}
                            selectedColor={selectedColor}
                            text={text}
                            onBack={onBack}
                        />
                    </div>
                )}
            </div>
            {!generated && (
                <div className="preview-input-wrapper">
                    <Input
                        className="preview-input"
                        value={text}
                        onChange={onInputText}
                    />
                    <Button onClick={onClickGenerateButton}>
                        버튼생성하기
                    </Button>
                </div>
            )}
        </Container>
    );
}

const Container = styled.div`
    width: 35rem;
    padding: 3rem;
    background-color: ${({ theme }) => theme.color.white};
    z-index: 11;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    border-radius: 1rem;

    .button-factory-wrapper {
        width: 100%;
        min-height: 15rem;
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

    .preview-input-wrapper {
        width: 100%;
        display: flex;
        gap: 1rem;
    }

    .preview-input {
        flex: 1;
    }
`;

export default WidgetFactoryModal;
