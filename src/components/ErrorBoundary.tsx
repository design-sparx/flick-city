import React, { ReactNode } from 'react';
import { Box, Button, Code, Container, Paper, Spoiler, Stack, Text, Title } from '@mantine/core';
import { FaChevronDown, FaChevronRight, FaChevronUp, FaGithub } from 'react-icons/fa';

interface IProps {
  children: ReactNode
}

interface IState {
  errorMessage: string
  error: any
}

class ErrorBoundary extends React.Component<IProps, IState> {
  constructor (props: any) {
    super(props);
    this.state = {
      errorMessage: '',
      error: ''
    };
  }

  state = {
    errorMessage: '',
    error: ''
  };

  static getDerivedStateFromError (error: any): any {
    return { errorMessage: error.stack.toString() };
  }

  componentDidCatch (error: any, info: any): any {
    this.logErrorToServices(error, info.componentStack);
  }

  // A fake logging service.
  logErrorToServices = console.log;

  render (): any {
    if (this.state.errorMessage !== '') {
      return (
        <div
          style={{
            paddingTop: 80,
            paddingBottom: 120
          }}>
          <Container style={{ textAlign: 'center' }}>
            <Stack align="center" spacing="lg">
              <Box
                style={{
                  textAlign: 'center',
                  fontWeight: 900,
                  fontSize: 220,
                  lineHeight: 1
                }}>400
              </Box>
              <Title
                style={{
                  textAlign: 'center',
                  fontWeight: 900,
                  fontSize: 38
                }}>Something bad just happened on our part.</Title>
              <Spoiler
                maxHeight={0}
                showLabel={<Text py="md">See error log&nbsp;<FaChevronDown size={14}/></Text>}
                hideLabel={<Text py="md">Hide&nbsp;<FaChevronUp size={14}/></Text>}>
                <Paper withBorder shadow="sm" p="md">
                  <Code
                    style={{
                      maxWidth: 540,
                      margin: 'auto',
                      marginTop: 30,
                      marginBottom: 30 * 1.5
                    }}>
                    {this.state.errorMessage}
                  </Code>
                </Paper>
              </Spoiler>
              <Button
                leftIcon={<FaGithub size={14}/>}
                rightIcon={<FaChevronRight size={14}/>}
                component="a"
                href="https://github.com/kelvins-lab/flick-city/issues/new/choose">
                Report issue on GitHub
              </Button>
            </Stack>
          </Container>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
