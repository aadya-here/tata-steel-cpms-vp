import React from 'react';
import { Box, Card, Chip, Typography, Divider, ListItem, CardActions, Button } from '@mui/joy';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import GetAppIcon from '@mui/icons-material/GetApp';
import { useMediaQuery } from '@mui/material';

const FormCard = ({ projectName, date, formStatus, formName }) => {
    const isLargeScreen = useMediaQuery('(min-width:600px)');
    const getColor = (status) => {
        switch (status) {
            case 'approved':
                return 'success';
            case 'rejected':
                return 'error';
            case 'pending':
                return 'warning';
            default:
                return 'neutral';
        }
    };

    return (
        <Card
            size="md"
            variant="outlined"
            sx={{
                maxHeight: isLargeScreen ? '220px' : '200px',
                minWidth: isLargeScreen ? '400px' : '200px',
            }}
        >
            <Typography level="h4">{projectName}</Typography>
            <div className="flex justify-between items-center">
                <Chip size="sm" variant="outlined" color={getColor(formStatus)}>
                    {formName}
                </Chip>
                <ListItem size="sm" className="list-none">{date}</ListItem>
            </div>
            <Divider inset="none" />
            <CardActions className="flex justify-between items-center">
                <Button
                    size="sm"
                    variant="soft"
                    color="neutral"
                    endDecorator={<KeyboardArrowRight />}
                >
                    View
                </Button>
                <Button
                    size="sm"
                    variant="soft"
                    color="neutral"
                    startDecorator={<GetAppIcon />}
                >
                    {isLargeScreen ? 'Download' : ''}
                </Button>
            </CardActions>
        </Card>
    );
};

export default FormCard;