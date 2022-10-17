# Log Viewer

## What it is?

An application made on ReactJS for a convinient log observation

## How does it work?

This application shows the amount of each resource the users have at a _certain_ moment of time.
Consists of:

-   A scroller of all entries from the earliest to the latest timestamp
-   A table of resources

The scroller determines the time for which data is displayed in the table of resources.
The table of resources displays the total amount of each resource and the amount of each resource each user has.
While moving the scroller, the table is updated in real time.

## Features

-   You can choose the order by pressing on "Value" column header. (Since I found the task a bit shady in explaining which order is supposed to be, I decided to implement this ability).
-   If the scroller is at its maximum timestamp, the Update button appears on the screen. Pressing it allows you to receive actual data. The button implemented to prevent unexpected API-call. User can decide by himself, does he want to refresh data or not.

## Performance and Improvements

The application is implemented as it's requiered in the task. I find this way of visualization not very convinient though. Especially when the number of users or resources grows up.
First of all, I would implement more flexible settings which would allow you to specify which users/resources has to be rendered in the table.
Secondly, presentating the data in a single table, where each user corresponds to the current value of the resource seems to me more logical (with an ability to choose any order you want, of course).
