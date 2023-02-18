import { Global } from '@mantine/core';
import React from 'react';
// @ts-expect-error
import black from './Inter/Inter-Black.woff2';
// @ts-expect-error
import bold from './Inter/Inter-Bold.woff2';
// @ts-expect-error
import extraBold from './Inter/Inter-ExtraBold.woff2';
// @ts-expect-error
import extraLight from './Inter/Inter-ExtraLight.woff2';
// @ts-expect-error
import light from './Inter/Inter-Light.woff2';
// @ts-expect-error
import medium from './Inter/Inter-Medium.woff2';
// @ts-expect-error
import regular from './Inter/Inter-Regular.woff2';
// @ts-expect-error
import semiBold from './Inter/Inter-SemiBold.woff2';
// @ts-expect-error
import thin from './Inter/Inter-Thin.woff2';

const CustomFont = (): JSX.Element => {
  return (
    <Global
      styles={[
        {
          '@font-face': {
            fontFamily: 'Inter',
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            src: `url('${black}') format("woff2")`,
            fontWeight: 900,
            fontStyle: 'normal'
          }
        },
        {
          '@font-face': {
            fontFamily: 'Inter',
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            src: `url('${extraBold}') format("woff2")`,
            fontWeight: 800,
            fontStyle: 'normal'
          }
        },
        {
          '@font-face': {
            fontFamily: 'Inter',
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            src: `url('${bold}') format("woff2")`,
            fontWeight: 700,
            fontStyle: 'normal'
          }
        },
        {
          '@font-face': {
            fontFamily: 'Inter',
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            src: `url('${semiBold}') format("woff2")`,
            fontWeight: 600,
            fontStyle: 'normal'
          }
        },
        {
          '@font-face': {
            fontFamily: 'Inter',
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            src: `url('${medium}') format("woff2")`,
            fontWeight: 500,
            fontStyle: 'normal'
          }
        },
        {
          '@font-face': {
            fontFamily: 'Inter',
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            src: `url('${regular}') format("woff2")`,
            fontWeight: 400,
            fontStyle: 'normal'
          }
        },
        {
          '@font-face': {
            fontFamily: 'Inter',
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            src: `url('${light}') format("woff2")`,
            fontWeight: 300,
            fontStyle: 'normal'
          }
        },
        {
          '@font-face': {
            fontFamily: 'Inter',
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            src: `url('${extraLight}') format("woff2")`,
            fontWeight: 200,
            fontStyle: 'normal'
          }
        },
        {
          '@font-face': {
            fontFamily: 'Inter',
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            src: `url('${thin}') format("woff2")`,
            fontWeight: 100,
            fontStyle: 'normal'
          }
        }
      ]}
    />
  );
};

export default CustomFont;
