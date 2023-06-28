import { useSelector } from 'react-redux';

// mui components
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Paper } from '@mui/material';

// * This component sums up each type of content and displays that count on the DOM.
export default function ConsumedContent() {
    const userActivities = useSelector(store => store.userActivities)

    // Functions that finds which activities the user has logged that apply to a supplied type of content
    function filterCompletedActivites(activity) {
        return userActivities.filter(item => {
            if(item.activity.toLowerCase().includes(activity)){
                return item;
            }
        })
    }

    const podcasts = filterCompletedActivites('finish podcast');
    const videos = filterCompletedActivites('watch a video');
    const courses = filterCompletedActivites('finish a course');
    const bookSummaries = filterCompletedActivites('complete book summary');
    const articles = filterCompletedActivites('read an article');
    const audiobooks = filterCompletedActivites('finish an audiobook');
    const books = filterCompletedActivites('finish a book');
    const workouts = filterCompletedActivites('workout');
    const speedRead = filterCompletedActivites('speed read (full book)');

    const completedThisYear = (arr) => {
        const doneThisYear = arr.filter(item => {
            const formattedDate = item.date.slice(6);
            if(formattedDate ==  new Date().getFullYear()){
                return item;
            }
        })
        return doneThisYear.length
    }

    return(
        <>
            <h2>content</h2>
            <TableContainer component={Paper}>
                <Table size='small' aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Content</TableCell>
                            <TableCell align="center">Total</TableCell>
                            <TableCell align="center">This Year</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {/* Book Summaries Row */}
                        <TableRow>
                            <TableCell align='center'>Book Summaries</TableCell>
                            <TableCell align='center'>{bookSummaries.length}</TableCell>
                            <TableCell align='center'>{completedThisYear(bookSummaries)}</TableCell>
                        </TableRow>
                        {/* Podcasts Row */}
                        <TableRow>
                            <TableCell align='center'>Podcasts</TableCell>
                            <TableCell align='center'>{podcasts.length}</TableCell>
                            <TableCell align='center'>{completedThisYear(podcasts)}</TableCell>
                        </TableRow>
                        {/* Videos Row */}
                        <TableRow>
                            <TableCell align='center'>Videos</TableCell>
                            <TableCell align='center'>{videos.length}</TableCell>
                            <TableCell align='center'>{completedThisYear(videos)}</TableCell>
                        </TableRow>
                        {/* Articles Row */}
                        <TableRow>
                            <TableCell align='center'>Articles</TableCell>
                            <TableCell align='center'>{articles.length}</TableCell>
                            <TableCell align='center'>{completedThisYear(articles)}</TableCell>
                        </TableRow>
                        {/* Courses Row */}
                        <TableRow>
                            <TableCell align='center'>Courses</TableCell>
                            <TableCell align='center'>{courses.length}</TableCell>
                            <TableCell align='center'>{completedThisYear(courses)}</TableCell>
                        </TableRow>
                        {/* Books Row */}
                        <TableRow>
                            <TableCell align='center'>Books</TableCell>
                            <TableCell align='center'>{books.length}</TableCell>
                            <TableCell align='center'>{completedThisYear(books)}</TableCell>
                        </TableRow>
                        {/* Speed Read Row */}
                        <TableRow>
                            <TableCell align='center'>Speed Read</TableCell>
                            <TableCell align='center'>{speedRead.length}</TableCell>
                            <TableCell align='center'>{completedThisYear(speedRead)}</TableCell>
                        </TableRow>
                        {/* Audiobooks Row */}
                        <TableRow>
                            <TableCell align='center'>Audiobooks</TableCell>
                            <TableCell align='center'>{audiobooks.length}</TableCell>
                            <TableCell align='center'>{completedThisYear(audiobooks)}</TableCell>
                        </TableRow>
                        {/* Workouts Row */}
                        <TableRow>
                            <TableCell align='center'>Workouts</TableCell>
                            <TableCell align='center'>{workouts.length}</TableCell>
                            <TableCell align='center'>{completedThisYear(workouts)}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
};
