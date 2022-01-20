
import React, { useEffect, useState } from "react"
import { Resizable, ResizableBox } from 'react-resizable';
import './dashboard.css';

import { getAdminDashboard } from '../services';
import Loader from '../components/loader/loader';
import { faUsers, faCalendarAlt, faMeteor, faChartBar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Grid from '@material-ui/core/Grid';

import Timeline from '../widgets/timeline/timeline'
import { ThemedPaper, ThemedSecondaryButton, ThemedPrimaryButton, CircularButton } from '../components/styled';

function Dashboard(props) {
  const [loading, setLoading] = useState(true);
  const [dashboarddata, setDashboarddata] = useState({});

  useEffect(() => {
    getAdminDashboard().then(res => {
      setDashboarddata(res);
      setLoading(false);
    })
  }, [])

  return (
    <>
      <section id="contents">

        {
          loading ? (<div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center', alignItems: 'center' }}><div><Loader /></div> <div>Compiling dashboard. please wait</div></div>) : (
            <>
              <section className="statistics">
                <div className="container-fluid">
                  <Grid container spacing={2}>
                    <Grid item xs={10} className='statistics-wrapper-parent'>
                      <Grid container spacing={2} >
                        <Grid item xs={6} className='statistics-wrapper-parent'>
                          <ThemedPaper>
                            <div className="statistic-content  statistic-color-1 border-double">
                              <Timeline data={dashboarddata.challengeattended} />
                            </div>
                          </ThemedPaper>
                        </Grid>
                        <Grid item xs={6} className='statistics-wrapper-parent'>
                          <ThemedPaper>
                            <div className="statistic-content  statistic-color-1 border-double">
                              <Timeline data={dashboarddata.challengeattended} />
                            </div>
                          </ThemedPaper>
                        </Grid>
                        <Grid item xs={6} className='statistics-wrapper-parent'>
                          <ThemedPaper>
                            <div className="statistic-content  statistic-color-1 border-double">
                              <Timeline data={dashboarddata.challengeattended} />
                            </div>
                          </ThemedPaper>
                        </Grid>
                        <Grid item xs={6} className='statistics-wrapper-parent'>
                          <ThemedPaper>
                            <div className="statistic-content  statistic-color-1 border-double">
                              <Timeline data={dashboarddata.challengeattended} />
                            </div>
                          </ThemedPaper>
                        </Grid>
                      </Grid>


                    </Grid>
                    <Grid item xs={2} className='statistics-wrapper-parent'>

                      <Grid container spacing={2}>
                        <Grid container spacing={2} >
                          <Grid item xs={12} className='statistics-wrapper-parent'>
                            <ThemedPaper>
                              <div className="statistic-tilte">
                                <FontAwesomeIcon icon={faUsers} style={{ marginRight: '8px' }} /> Total Users
                        </div>
                              <div className="statistic-content  statistic-color-1">
                                {dashboarddata.usercount}
                              </div>
                            </ThemedPaper>
                          </Grid>
                          <Grid item xs={12} className='statistics-wrapper-parent'>
                            <ThemedPaper>
                              <div className="statistic-tilte">
                                <FontAwesomeIcon icon={faCalendarAlt} style={{ marginRight: '8px' }} /> Total Schedules
                        </div>
                              <div className="statistic-content  statistic-color-2">
                                {dashboarddata.schedulecount}
                              </div>
                            </ThemedPaper>
                          </Grid>
                          <Grid item xs={12} className='statistics-wrapper-parent'>
                            <ThemedPaper>
                              <div className="statistic-tilte">
                                <FontAwesomeIcon icon={faMeteor} style={{ marginRight: '8px' }} /> Total Challenges
                        </div>
                              <div className="statistic-content  statistic-color-3">
                                {dashboarddata.challengecount}
                              </div>
                            </ThemedPaper>
                          </Grid>
                          <Grid item xs={12} className='statistics-wrapper-parent'>
                            <ThemedPaper>
                              <div className="statistic-tilte">
                                <FontAwesomeIcon icon={faChartBar} style={{ marginRight: '8px' }} /> Total Activities
                        </div>
                              <div className="statistic-content  statistic-color-4">
                                {dashboarddata.challengeattended.length}
                              </div>
                            </ThemedPaper>
                          </Grid>
                          <Grid item xs={12} className='statistics-wrapper-parent'>
                            <ThemedPaper>
                              <div className="statistic-tilte">
                                <FontAwesomeIcon icon={faUsers} style={{ marginRight: '8px' }} /> Total Activities
                        </div>
                              <div className="statistic-content  statistic-color-4">
                                {dashboarddata.challengeattended.length}
                              </div>
                            </ThemedPaper>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>


                </div>
              </section>
              {/* <section className="charts">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="chart-container">
                        <h3>Chart</h3>
                        <canvas id="myChart"></canvas>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="chart-container">
                        <h3>Chart2</h3>
                        <canvas id="myChart2"></canvas>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <section className="admins">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="box">
                        <h3>Admins:</h3>
                        <div className="admin">
                          <div className="img">
                            <img className="img-responsive" src="https://uniim1.shutterfly.com/ng/services/mediarender/THISLIFE/021036514417/media/23148906966/small/1501685402/enhance" alt="admin" />
                          </div>
                          <div className="info">
                            <h3>Joge Lucky</h3>
                            <p>Lorem ipsum dolor sit amet.</p>
                          </div>
                        </div>
                        <div className="admin">
                          <div className="img">
                            <img className="img-responsive" src="https://uniim1.shutterfly.com/ng/services/mediarender/THISLIFE/021036514417/media/23148907137/small/1501685404/enhance" alt="admin" />
                          </div>
                          <div className="info">
                            <h3>Joge Lucky</h3>
                            <p>Lorem ipsum dolor sit amet.</p>
                          </div>
                        </div>
                        <div className="admin">
                          <div className="img">
                            <img className="img-responsive" src="https://uniim1.shutterfly.com/ng/services/mediarender/THISLIFE/021036514417/media/23148907019/small/1501685403/enhance" alt="admin" />
                          </div>
                          <div className="info">
                            <h3>Joge Lucky</h3>
                            <p>Lorem ipsum dolor sit amet.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="box">
                        <h3>Moderators:</h3>
                        <div className="admin">
                          <div className="img">
                            <img className="img-responsive" src="https://uniim1.shutterfly.com/ng/services/mediarender/THISLIFE/021036514417/media/23148907114/small/1501685404/enhance" alt="admin" />
                          </div>
                          <div className="info">
                            <h3>Joge Lucky</h3>
                            <p>Lorem ipsum dolor sit amet.</p>
                          </div>
                        </div>
                        <div className="admin">
                          <div className="img">
                            <img className="img-responsive" src="https://uniim1.shutterfly.com/ng/services/mediarender/THISLIFE/021036514417/media/23148907086/small/1501685404/enhance" alt="admin" />
                          </div>
                          <div className="info">
                            <h3>Joge Lucky</h3>
                            <p>Lorem ipsum dolor sit amet.</p>
                          </div>
                        </div>
                        <div className="admin">
                          <div className="img">
                            <img className="img-responsive" src="https://uniim1.shutterfly.com/ng/services/mediarender/THISLIFE/021036514417/media/23148907008/medium/1501685726/enhance" alt="admin" />
                          </div>
                          <div className="info">
                            <h3>Joge Lucky</h3>
                            <p>Lorem ipsum dolor sit amet.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <section className='statis text-center'>
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-md-3">
                      <div className="box bg-primary">
                        <i className="fa fa-eye"></i>
                        <h3>5,154</h3>
                        <p className="lead">Page views</p>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="box danger">
                        <i className="fa fa-user-o"></i>
                        <h3>245</h3>
                        <p className="lead">User registered</p>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="box warning">
                        <i className="fa fa-shopping-cart"></i>
                        <h3>5,154</h3>
                        <p className="lead">Product sales</p>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="box success">
                        <i className="fa fa-handshake-o"></i>
                        <h3>5,154</h3>
                        <p className="lead">Transactions</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <section className="chrt3">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-md-9">
                      <div className="chart-container">
                        <canvas id="chart3" width="100%"></canvas>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="box">
                      </div>
                    </div>
                  </div>
                </div>
              </section> */}

            </>
          )
        }

      </section>
    </>
  );
}

export default Dashboard;
