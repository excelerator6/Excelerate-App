import { useSelector } from 'react-redux';

// mui components
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

// * This component needs to sum up each type of content and display it.
// * Need to display Books, Podcasts, Videos, Audiobooks, Courses, Articles, Workouts, Book Summaries?, Speed Read?
// * Need to loop through the user's activities, figure out which activities relate to which content, and sum the up
function ConsumedContent() {
    const userActivities = useSelector(store => store.userActivities)

    // functions that find which activities the user has logged apply to that type of content
    const podcasts = userActivities.filter(item => {
        if(item.activity.toLowerCase().includes('finish podcast')){
            return item;
        }
    })
    const videos = userActivities.filter(item => {
        if(item.activity.toLowerCase().includes('watch a video')){
            return item;
        }
    })
    const courses = userActivities.filter(item => {
        if(item.activity.toLowerCase().includes('finish a course')){
            return item;
        }
    })
    const bookSummaries = userActivities.filter(item => {
        if(item.activity.toLowerCase().includes('complete book summary')){
            return item;
        }
    })
    const articles = userActivities.filter(item => {
        if(item.activity.toLowerCase().includes('read an article')){
            return item;
        }
    })
    const audiobooks = userActivities.filter(item => {
        if(item.activity.toLowerCase().includes('finish an audiobook')){
            return item;
        }
    })
    const books = userActivities.filter(item => {
        if(item.activity.toLowerCase().includes('finish a book')){
            return item;
        }
    })
    const workouts = userActivities.filter(item => {
        if(item.activity.toLowerCase().includes('workout')){
            return item;
        }
    })
    const speedRead = userActivities.filter(item => {
        if(item.activity.toLowerCase().includes('speed read (full book)')){
            return item;
        }
    })

    return(
        <>
            <h2>Content</h2>
            <TableContainer>
                <Table size='small' aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Content</TableCell>
                            <TableCell align="center">Total</TableCell>
                            <TableCell align="center">This Year</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell align='center'>Book Summaries</TableCell>
                            <TableCell align='center'>{bookSummaries.length}</TableCell>
                            <TableCell align='center'>{courses.length}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align='center'>Podcasts</TableCell>
                            <TableCell align='center'>{podcasts.length}</TableCell>
                            <TableCell align='center'>{podcasts.length}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align='center'>Videos</TableCell>
                            <TableCell align='center'>{videos.length}</TableCell>
                            <TableCell align='center'>{videos.length}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align='center'>Articles</TableCell>
                            <TableCell align='center'>{articles.length}</TableCell>
                            <TableCell align='center'>{courses.length}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align='center'>Courses</TableCell>
                            <TableCell align='center'>{courses.length}</TableCell>
                            <TableCell align='center'>{courses.length}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align='center'>Books</TableCell>
                            <TableCell align='center'>{books.length}</TableCell>
                            <TableCell align='center'>{courses.length}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align='center'>Speed Read</TableCell>
                            <TableCell align='center'>{speedRead.length}</TableCell>
                            <TableCell align='center'>{courses.length}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align='center'>Audiobooks</TableCell>
                            <TableCell align='center'>{audiobooks.length}</TableCell>
                            <TableCell align='center'>{courses.length}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align='center'>Workouts</TableCell>
                            <TableCell align='center'>{workouts.length}</TableCell>
                            <TableCell align='center'>{courses.length}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}
export default ConsumedContent;