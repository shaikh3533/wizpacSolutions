// import React from 'react';
// import TextField from '@mui/material/TextField';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import Box from '@mui/material/Box';
// import Stack from '@mui/material/Stack';
// import { MobileDateRangePicker } from '@mui/x-date-pickers-pro/MobileDateRangePicker';
// import { DesktopDateRangePicker } from '@mui/x-date-pickers-pro/DesktopDateRangePicker';
// import { DateRange } from '@mui/x-date-pickers-pro/DateRangePicker';

// export default function DatePicker() {
//   const [value, setValue] = React.useState<DateRange<Date>>([null, null]);

//   return (
//     <Stack spacing={3}>
//       <LocalizationProvider
//         dateAdapter={AdapterDateFns}
//         localeText={{ start: 'Mobile start', end: 'Desktop end' }}
//       >
//         <MobileDateRangePicker
//           value={value}
//           onChange={(newValue) => {
//             setValue(newValue);
//           }}
//           renderInput={(startProps, endProps) => (
//             <React.Fragment>
//               <TextField {...startProps} />
//               <Box sx={{ mx: 2 }}> to </Box>
//               <TextField {...endProps} />
//             </React.Fragment>
//           )}
//         />
//       </LocalizationProvider>
//       <LocalizationProvider
//         dateAdapter={AdapterDateFns}
//         localeText={{ start: 'Desktop start', end: 'Desktop end' }}
//       >
//         <DesktopDateRangePicker
//           value={value}
//           onChange={(newValue) => {
//             setValue(newValue);
//           }}
//           renderInput={(startProps, endProps) => (
//             <React.Fragment>
//               <TextField {...startProps} />
//               <Box sx={{ mx: 2 }}> to </Box>
//               <TextField {...endProps} />
//             </React.Fragment>
//           )}
//         />
//       </LocalizationProvider>
//     </Stack>
//   );
// }


// import * as React from 'react';
// import { useEffect } from 'react';
// import TextField from '@mui/material/TextField';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import Box from '@mui/material/Box';
// import Stack from '@mui/material/Stack';
// import { MobileDateRangePicker } from '@mui/x-date-pickers-pro/MobileDateRangePicker';
// // import { DateRange } from '@mui/x-date-pickers-pro/DateRangePicker';

// export default function DatePicker(props) {

//     useEffect(() => {
//         if (props.gridApi) {
//             var dateFilterComponent = props.gridApi.api.getFilterInstance("Notification");
//             dateFilterComponent.setModel({
//                 type: props.getFilterType(),
//                 inRange: true,
//                 dateFrom: props.startDate,
//                 dateTo: props.endDate,
//             });
//             props.gridApi.api.onFilterChanged();
//         }
//     }, [props.startDate, props.endDate]);

//     const [value, setValue] = React.useState([null, null]);

//     return (
//         <Stack spacing={3}>
//             <LocalizationProvider
//                 dateAdapter={AdapterDateFns}
//                 localeText={{ start: 'Start Date', end: 'End Date' }}
//             >
//                 <MobileDateRangePicker
//                     value={value}
//                     onChange={(newValue) => {
//                         setValue(newValue);
//                     }}
//                     renderInput={(startProps, endProps) => (
//                         <React.Fragment>
//                             {
//                             console.log(startProps) }
//                          {   console.log(endProps)}
                           
//                             <TextField {...startProps} />
//                             <Box sx={{ mx: 2 }}> to </Box>
//                             <TextField {...endProps} />
//                         </React.Fragment>
//                     )}
//                 />
//             </LocalizationProvider>
//         </Stack>
//     );
// }