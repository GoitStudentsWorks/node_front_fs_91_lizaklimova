import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { createBoard } from '../../../redux/board/boardOperations';
import { selectOneBoard } from '../../../redux/board/boardSelectors';
import { validateInputMaxLength } from 'helpers';
import ModalWrapper from '../ModalWrapper/ModalWrapper';
import { IconsList } from './IconsList';
import { BacksList } from './BacksList';
import Plus from 'components/Icons/Plus';
import {
  Form,
  Title,
  Label,
  Input,
  Text,
  Button,
  Span,
} from './BoardModal.styled';
import toast from 'react-hot-toast';

const BoardModal = ({ variant, closeModal }) => {
  const [errorMsg, setErrorMsg] = useState(null);
  const [errorClassName, setErrorClassName] = useState('');

  const titleRef = useRef(null);

  useEffect(() => {
    titleRef.current.focus();
  }, []);

  const dispatch = useDispatch();
  const { t } = useTranslation();
  const oneBoard = useSelector(selectOneBoard);

  const handleSubmit = e => {
    e.preventDefault();
    const { title, background, iconId } = e.target.elements;

    if (!title.value.trim()) {
      return toast(t('boards.modals.toast.error'));
    }

    const data = {
      title: title.value,
      iconId: iconId.value,
      backgroundId: background.value,
    };

    if (variant === 'add') {
      dispatch(createBoard(data));
      toast(t('boards.modals.toast.add.success'));
    } else {
      // dispatch(updateBoard(data));
      //  toast(t('boards.modals.toast.edit.success'));
    }

    return closeModal();
  };

  return (
    <ModalWrapper width={350} onClose={closeModal}>
      <Form onSubmit={handleSubmit}>
        <Title>
          {variant === 'add'
            ? t('boards.modals.newTitle')
            : t('boards.modals.editTitle')}
        </Title>

        <Label>
          <Input
            className={errorClassName}
            ref={titleRef}
            type="text"
            placeholder={t('boards.modals.input')}
            name="title"
            defaultValue={variant === 'add' ? '' : oneBoard.title}
            autoComplete="off"
            maxLength={25}
            onChange={e =>
              validateInputMaxLength(e, setErrorMsg, setErrorClassName)
            }
          />
          {errorMsg && <p>{errorMsg}</p>}
        </Label>

        <Text>{t('boards.modals.icons')}</Text>
        <IconsList />

        <Text>{t('boards.modals.background')}</Text>
        <BacksList />

        <Button type="submit">
          <Span>
            <Plus
              width={14}
              height={14}
              strokeColor={'var(--btn-icon-color)'}
            />
          </Span>
          {variant === 'add'
            ? t('boards.modals.newButton')
            : t('boards.modals.editButton')}
        </Button>
      </Form>
    </ModalWrapper>
  );
};

export default BoardModal;
