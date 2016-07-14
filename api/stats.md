# Stats API

## Total submitted videos for single recorder

Returns total number of submitted videos for a single recorder instance, grouped by day.

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

## Total number videos submitted for single account

Returns total number of submitted videos on a single account (all recorder instances grouped), grouped by day.

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
