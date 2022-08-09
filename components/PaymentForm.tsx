import * as React from 'react';
import { useForm, zodResolver } from '@mantine/form';
import { TextInput, Button, Text, Tooltip, LoadingOverlay, Modal } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { z } from 'zod';

const paymentSchema = z.object({
  cardNumber: z
      .string()
      .min(16, { message: 'Должно быть не менне 16 цифр' })
      .regex(
        /^[0-9]*$/,
        { message: 'Поле должно содержать только цифры' },
      ),
  cardHolderName: z
    .string()
    .regex(
        /^[a-zA-Z]*\s[a-zA-Z]*$/,
        { message: 'Поле должно содержать только латинские буквы' }
    )
    .min(4, { message: 'Должно быть не менне 4 букв' })
    .max(50, { message: 'Не более 50 букв' }),
  expDate: z.date({
    required_error: "Выберите дату",
    invalid_type_error: "Выберите дату",
  }),
  CVV: z
    .string()
    .regex( 
      /^\d{3}$/,
      { message: 'Поле должно содержать только цифры' }
    )
    .min(3, { message: 'Должно быть не менне 3 цифр' }),
});

export default function PaymentForm(): JSX.Element {
  let [ loading, setLoading ] = React.useState(false)
  let [ modalIsOpened, setModalIsOpened ] = React.useState(false)
  const form = useForm({
    validate: zodResolver(paymentSchema),
    validateInputOnChange: true,
    initialValues: {
      _id: undefined,
      cardNumber: '',
      cardHolderName: '',
      expDate: '',
      CVV: '',
    },
    initialErrors: {
      cardNumber: '',
      cardHolderName: '',
      expDate: '',
      CVV: '',
    },
  })
  
  const handleFormSubmit = (data: any) => {
    fetch('http://localhost:3000/api/addpayment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then( (res) => {
      if(res.status === 200){
        setLoading(false);
        setModalIsOpened(true)
      }
    })
  }

  return (
    <>
      <Modal
        opened={modalIsOpened}
        onClose={() => setModalIsOpened(false)}
        title="Оплата картой"
        sx={{textAlign: 'center'}}
        >
          <Text>Оплата прошла успешно</Text>
          <Button sx={{marginTop: '1rem'}} onClick={() => setModalIsOpened(false)}>ОК</Button>
      </Modal>
      <form 
        className="payment__form"
        onSubmit={form.onSubmit( (data) => {
          handleFormSubmit(data);
        })}
        >
        <style jsx>{`
        .payment__form {
          position: relative;
          border-radius: 4px;
        }`}</style>

        <LoadingOverlay visible={loading} overlayBlur={3} loaderProps={{ size: 'md', variant: 'dots' }}/>

        <Text  sx={{ marginBottom: '1rem'}}>Заполните данные банковской карты:</Text>
        <TextInput 
          sx={{ marginBottom: '1rem'}}
          required
          id="outlined-helper-text"
          label="Введите номер карты"
          maxLength={16}
          {...form.getInputProps('cardNumber')}
        />
        <TextInput 
          sx={{ marginBottom: '1rem'}}
          required
          id="outlined-error-helper-text"
          label="Введите имя и фамилию"
          minLength={5}
          maxLength={50}
          {...form.getInputProps('cardHolderName')}
        />
        <DatePicker dropdownType={'popover'} 
          sx={{ marginBottom: '1rem'}}
          label="Введите срок карты"
          required
          placeholder="Выберите дату"
          {...form.getInputProps('expDate')}
        />
        <TextInput 
          sx={{ marginBottom: '1rem'}}
          required
          id="outlined-error-helper-text"
          label="Введите CVV карты"
          minLength={3}
          maxLength={3}
          {...form.getInputProps('CVV')}
        />
        { Object.keys(form.errors).length === 0 ? 
        <Button  onClick={() => setLoading(true)} type="submit" loaderPosition="right">
          Оплатить
        </Button> :
        <Tooltip label="Заполните форму">
           <Button type="submit" disabled>
            Оплатить
          </Button>
        </Tooltip>
        }
      </form>
    </>
  );
}
