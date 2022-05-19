import React, { useState } from "react";
import { Tab, Tabs, Form, Button, Table } from "react-bootstrap";
import DatePicker from "react-datepicker";

interface IProps {}
const UserAppointment: React.FunctionComponent<IProps> = ({}) => {
  const [capacity, setCapacity] = useState<number>(6);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [startDateHour, setStartDateHour] = useState<Date>(new Date());
  const [startDateMinute, setStartDateMinute] = useState<Date>(new Date());
  const [endDateHour, setEndDateHour] = useState<Date>(
    new Date(new Date().getTime() + 45 * 60000)
  );
  const [endDateMinute, setEndDateMinute] = useState<Date>(
    new Date(new Date().getTime() + 45 * 60000)
  );
  const [error, setError] = useState({
    isNotValidNumber: false,
    isValidEndTime: false,
  });
  const filterPassedTime = (time: any) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);
    return currentDate.getTime() < selectedDate.getTime();
  };
  const submitSlot = () => {
    let isValidDate = true;
    let hourDiff = endDateHour?.getTime() - startDateHour.getTime();
    if (hourDiff < 0) {
      isValidDate = false;
    }
    let minuteDiff =
      (endDateMinute.getTime() - startDateMinute.getTime()) / 60000;
    if (minuteDiff < 0 || minuteDiff == 0) {
      isValidDate = false;
    }
    if (!isValidDate) {
      setError({ ...error, isValidEndTime: true });
    } else {
      let totalSlot = Math.floor(minuteDiff / capacity);
      let c = 0;
      let slotList = [];
      // let dateTime = new Date(
      //   startDateHour.getFullYear(),
      //   startDateHour.getMonth(),
      //   startDateHour.getDate(),
      //   startDateHour.getHours(),
      //   startDateMinute.getMinutes()
      // );
      // let futuredate = dateTime.setMinutes(dateTime.getMinutes() + totalSlot);
      let startHour = startDateMinute.getHours();
      let startMinute = startDateMinute.getMinutes();
      for (let index = 1; index <= totalSlot; index++) {
        let endTime = startMinute + totalSlot;
        if (endTime > 60) {
          endTime = endTime - 60;
        }
        if (startHour > 24) {
          startHour = 1;
        }
        let slotInfo = {
          timing:
            startHour + ":" + startMinute + " - " + startHour + ":" + endTime,
          seatCapacity: 1,
        };
        slotList.push(slotInfo);

        startMinute += totalSlot;
        if (startMinute > 60) {
          startHour += 1;
          startMinute = startMinute - 60;
        }
      }
      localStorage.setItem("slots", JSON.stringify(slotList));
    }
  };
  return (
    <div>
      <div className="d-flex py-3 px-2 groups-title-wrap">
        <div className="pr-1"> <span className="bar-wrap">
          <i className="fa fa-bars"></i>
        </span></div>
        <h3 className="groups-title pt-1">Create Appointment Slots</h3>
      </div>
      <div>
        <Tabs defaultActiveKey="15_min_slot" className="mb-3">
          <Tab eventKey="15_min_slot" title="Create Bulk 15 Min. Slots">
            <div className="row py-4">
              <div className="col-3">
                <p className="m-0 date-piker-wrap">
                  1. select date of appointment *
                </p>
                <span className="date-piker-text mb-2">
                  Please select the dates that you'd like to open up slots.
                </span>
                <div className="mt-4 main-date-piker">
                  <DatePicker
                    selected={startDate}
                    minDate={new Date()}
                    onChange={(date: Date) => {
                      setStartDate(date);
                    }}
                    inline
                  />
                </div>
              </div>
              <div className="col-4 hour-select-wrap">
                <p className="m-0 date-piker-wrap">2. SELECT The Hours *</p>
                <span className="date-piker-text mb-2">
                  Please select the Start and End Time.
                </span>
                <div className="row">
                  <div className="mt-4 col-6">
                    <div className="time-select d-flex">
                      <div>
                        <label className="hour-select">Start Hour</label>
                        <DatePicker
                          selected={startDateHour}
                          onChange={(date: Date) => {
                            setStartDateHour(date);
                            setStartDateMinute(date);
                            setEndDateHour(date);
                            setEndDateMinute(date);
                          }}
                          showTimeSelect
                          showTimeSelectOnly
                          timeIntervals={60}
                          filterTime={filterPassedTime}
                          timeCaption="Time"
                          timeFormat="HH:mm"
                          dateFormat="H"
                        />
                      </div>
                      <div>
                        <label className="hour-select">Minute</label>
                        <DatePicker
                          selected={startDateMinute}
                          onChange={(date: Date) => {
                            setStartDateHour(date);
                            setStartDateMinute(date);
                            setEndDateHour(date);
                          }}
                          showTimeSelect
                          showTimeSelectOnly
                          timeIntervals={15}
                          filterTime={filterPassedTime}
                          timeCaption="Time"
                          timeFormat="HH:mm"
                          dateFormat="mm"
                        />
                      </div>
                    </div>
                    <p className="Start-Time">Please select the Start Time.</p>
                  </div>
                  <div className="mt-4 col-6">
                    <div className="time-select d-flex">
                      <div>
                        <label className="hour-select">End Hour</label>
                        <DatePicker
                          selected={endDateHour}
                          onChange={(date: Date) => {
                            setEndDateHour(date);
                            setEndDateMinute(date);
                            setStartDateHour(date);
                            setStartDateMinute(date);

                            setError({
                              ...error,
                              isValidEndTime: false,
                            });
                          }}
                          showTimeSelect
                          showTimeSelectOnly
                          timeIntervals={60}
                          timeCaption="Time"
                          timeFormat="HH:mm"
                          filterTime={filterPassedTime}
                          dateFormat="H"
                        />
                      </div>
                      <div>
                        <label className="hour-select">Minute</label>
                        <DatePicker
                          selected={endDateMinute}
                          onChange={(date: Date) => {
                            setEndDateHour(date);
                            setEndDateMinute(date);
                            setError({
                              ...error,
                              isValidEndTime: false,
                            });
                          }}
                          showTimeSelect
                          showTimeSelectOnly
                          timeIntervals={15}
                          filterTime={filterPassedTime}
                          timeCaption="Time"
                          timeFormat="HH:mm"
                          dateFormat="mm"
                        />
                      </div>
                    </div>
                    <p className="Start-Time">
                      Please select the time your last 15 min Block Starts
                    </p>
                    {error.isValidEndTime && (
                      <span className="text-danger">
                        End time should be greater than the start time.
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-3">
                <p className="m-0 date-piker-wrap">
                  3. Choose Seating Capacity *
                </p>
                <span className="date-piker-text mb-2">
                  Please select the dates that you'd like to open up slots.
                </span>
                <div className="mt-4">
                  <Form.Control
                    type="number"
                    value={capacity}
                    onChange={(e: any) => {
                      if (e.target.value !== "" && e.target.value > 0) {
                        setCapacity(e.target.value);
                        if (e.target.value % 1 !== 0) {
                          setError({ ...error, isNotValidNumber: true });
                        } else {
                          if (e.target.value > 0) {
                            setError({
                              ...error,
                              isNotValidNumber: false,
                            });
                          }
                        }
                      }
                    }}
                  />
                  {error.isNotValidNumber && (
                    <span className="text-danger">Invalid input</span>
                  )}
                </div>
              </div>
              <div className="col-2"></div>
            </div>
            <div className="btn-wrap mt-4">
              <Button variant="btn btn-cancel">Cancel</Button>{" "}
              <Button variant="btn btn-create" onClick={() => submitSlot()}>
                Create Slots
              </Button>
            </div>
          </Tab>
          <Tab
            eventKey="one_slot"
            title="Create One Slots"
            className="table-search-wrap "
          ></Tab>
        </Tabs>
      </div>
    </div>
  );
};
export default UserAppointment;
