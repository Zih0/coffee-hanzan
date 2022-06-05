import { faCopy } from '@fortawesome/free-regular-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useModal from '@hooks/useModal';
import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import styled from 'styled-components';

import Button from '@components/common/Button';

import { AuthContext } from '@contexts/AuthContext';

interface ICodeSectionProps {
    selectedBackground: string;
    selectedColor: string;
    text: string;
    onBack: () => void;
}

function CodeSection({
    selectedBackground,
    selectedColor,
    text,
    onBack,
}: ICodeSectionProps) {
    const { user } = useContext(AuthContext);
    const [isScript, setIsScript] = useState(true);
    const [isMount, setIsMount] = useState(false);
    const { closeCurrentModal } = useModal();
    const imgCode = `<a href='https://coffee-hanzan.com/${user.nickname}' target='_blank'><img height='56' style='border:0px;height:56px;' src='http://cdn.coffee-hanzan.com/default-btn.png' border='0' alt='커피한잔에서 커피 후원해주세요 :)' /></a>`;
    const scriptCode = `<script type='text/javascript' src='https://cdn.coffee-hanzan.com/widget.min.js'></script><script type='text/javascript'>coffeeWidget.init('${text}', '${selectedBackground}','${selectedColor}', '${user.nickname}');coffeeWidget.draw();</script>`;

    const onClickImgBtn = () => {
        setIsScript(false);
        copyTextToClipboard();
    };

    const onClickScriptBtn = () => {
        setIsScript(true);
        copyTextToClipboard();
    };

    async function copyTextToClipboard() {
        const copyText = isScript ? scriptCode : imgCode;

        if ('clipboard' in navigator)
            await navigator.clipboard.writeText(copyText);
        else document.execCommand('copy', true, copyText);

        toast.success('코드가 복사되었습니다.');
        closeCurrentModal();
    }

    return (
        <Container>
            <div className="close-icon-wrapper">
                <div className="icon-box" onClick={onBack}>
                    <FontAwesomeIcon icon={faTimes} />
                </div>
            </div>
            <div className="code-wrapper">
                {isScript ? scriptCode : imgCode}
            </div>
            <div className="copy-btn-wrapper">
                <Button onClick={onClickScriptBtn}>
                    <FontAwesomeIcon icon={faCopy} />
                    스크립트 코드 복사
                </Button>
                <Button onClick={onClickImgBtn}>
                    <FontAwesomeIcon icon={faCopy} />
                    이미지 코드 복사
                </Button>
            </div>
        </Container>
    );
}

const Container = styled.div`
    .close-icon-wrapper {
        width: 100%;
        display: flex;
        justify-content: flex-end;
        margin-bottom: 8px;
        padding-right: 4px;

        svg {
            font-size: 14px;
            color: ${({ theme }) => theme.color.white};
        }
    }

    .icon-box {
        cursor: pointer;
        padding: 6px 8px;
        background-color: ${({ theme }) => theme.color.black_800};
        border-radius: 50%;
        &:hover {
            background-color: ${({ theme }) => theme.color.black_900};
        }
    }

    .code-wrapper {
        width: 100%;
        padding: 2rem;
        color: ${({ theme }) => theme.color.white};
        background-color: ${({ theme }) => theme.color.black_800};
        border-radius: 8px;
        margin-bottom: 8px;
    }

    .copy-btn-wrapper {
        display: flex;
        gap: 0.5rem;

        > button {
            flex: 1;
            gap: 4px;
        }
    }
`;

export default CodeSection;
