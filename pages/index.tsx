import Head from "next/head";
import PaymentForm from "../components/PaymentForm";
import { AppShell, Container, Header, Text, useMantineTheme } from '@mantine/core';

function Home() {
  const theme = useMantineTheme();
  return (
    <>
      <Head>
        <meta name="description" content="Payment test app" />
        <title>Payment information</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppShell 
        styles={{
          main: {
            background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
          },
        }}
        navbarOffsetBreakpoint="sm"
        asideOffsetBreakpoint="sm"
        fixed
        header={
            <Header height={70} p="md" sx={{ 
              display: 'flex',
              alignItems: 'center',
            }}>
                <Container sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  flexGrow: 1,
                  maxWidth: '500px',
                }}>
                    <Text size="xl">PayApp</Text>
                </Container>
            </Header>
        }
        >
        <Container sx={{ maxWidth: '500px' }}>
          <Text sx={{ 
            fontSize: '1.2rem',
            alignSelf: 'center',
            marginBottom: '1.3rem'
          }}>
            Платежная информация
          </Text>
          <PaymentForm />
        </Container>
      </AppShell>
    </>
  );
}

export default Home;
