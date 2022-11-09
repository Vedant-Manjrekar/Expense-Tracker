import React from 'react';
import { Heading, Text, Box } from '@chakra-ui/react';
import useTransactions from '../Custom Hooks/useTransactions';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement } from 'chart.js';
import { extendTheme } from '@chakra-ui/react';

// // Custom breakpoints for Chakra UI elements.
const breakpoints = {
  sm: '666px',
  md: '1100px',
  lg: '1200px',
  '2xl': '1536px',
};

const theme = extendTheme({ breakpoints });

// ? Setting of Chart.js for legend.
Chart.register(ArcElement);

function Income_Expense({ heading, color }) {
  // // Getting the sum of Income/Expense from Custom Hook.
  const { sum, chartData } = useTransactions(heading);

  return (
    <>
      <Box
        borderRadius="12px"
        backgroundColor="white"
        h={{
          sm: 'max-content',
          md: 'max-content',
          lg: 'max',
        }}
        w={{
          sm: '-webkit-fill-available',
          md: '70vw',
          lg: '-webkit-fill-available',
        }}
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Box
          borderTopRadius="12px"
          backgroundColor={color}
          alignContent="flex-end"
          height="-webkit-fit-content"
          h="2vh"
        />
        <Heading as="h5" size="md" p="1.5rem">
          {heading}
        </Heading>
        <Text transform="translateY(-1rem)">₹ {sum}</Text>

        <div className="doughnut" style={{ marginBottom: '3rem' }}>
          <Doughnut
            height="12rem"
            width="12rem"
            options={{ maintainAspectRatio: false }}
            data={chartData}
          />
        </div>
      </Box>
    </>
  );
}

export default Income_Expense;
