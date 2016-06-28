# Stats API

## Number videos submitted for single recorder instance by date

Returns total number of submitted videos for a single recorder instances, grouped by day.

****Request****

    GET /stats/recorders/:id/by_day?start_date=2016-01-01&end_date=2016-02-01

****Response****

    {
      data: [
        {
          date: "2016-02-02",
          total_submitted: 26  
        },
        {
          date: "2016-02-03",
          total_submitted: 11
        },
        {
          date: "2016-02-04",
          total_submitted: 369
        }
      ]
    }

## Number videos submitted for single account by date

Returns total number of submitted videos on a single account, grouped by day.

****Request****

    GET /stats/accounts/:id/by_day?start_date=2016-01-01&end_date=2016-02-01

****Response****

    {
      data: [
        {
          date: "2016-02-02",
          total_submitted: 26  
        },
        {
          date: "2016-02-03",
          total_submitted: 11
        },
        {
          date: "2016-02-04",
          total_submitted: 369
        }
      ]
    }
