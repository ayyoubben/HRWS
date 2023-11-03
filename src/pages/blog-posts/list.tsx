import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  TextField,
  Drawer,
  Autocomplete,
  Grid,
  Box,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

import TuneIcon from '@mui/icons-material/Tune';
import HotelIcon from '@mui/icons-material/Hotel';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'

interface Hotel {
  id: number;
  name: string;
  address: {
    country: string;
    city: string;
    street: string;
    number: string;
    location: string;
    gps: string;
  };
  price: number;
  stars: number;
  beds: number;
  roomImage: string;
}

// Composant de la carte d'hôtel
const HotelCard: React.FC<{ hotel: Hotel }> = ({ hotel }) => {
  const [openReservationDialog, setOpenReservationDialog] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    firstName: '',
    cardNumber: '',
    expirationDate: '',
    cvv: '',
  });

  const handleReserveClick = () => {
    setOpenReservationDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenReservationDialog(false);
  };

  const handleFormChange = (event: any) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleDatePickerChange = (date: any) => {
    setFormData({ ...formData, expirationDate: `${date['$M']+1}/${date['$y'].toString().slice(-2)}` });
  };

  return (
    <div>
      <Card>
        <CardMedia
          component="img"
          alt={hotel.name}
          height="200"
          image={hotel.roomImage}
          title={hotel.name}
        />
        <CardContent>
          <Typography variant="h6">{hotel.name}</Typography>
          <Typography>{hotel.address.number}, {hotel.address.street}, {hotel.address.city}, {hotel.address.country}</Typography>
          <Typography>Prix: {hotel.price}</Typography>
          <Typography>Étoiles: {hotel.stars}</Typography>
          <Typography>Lits proposés: {hotel.beds}</Typography>
          <Button onClick={handleReserveClick} startIcon={<HotelIcon />}>Réserver</Button>
        </CardContent>
      </Card>

      {/* Modal de réservation */}
      <Dialog open={openReservationDialog} onClose={handleCloseDialog}>
        <DialogTitle>Réservation d'hôtel</DialogTitle>
        <DialogContent>
          <Grid container spacing={1}>
              <Grid item xs={6}>
                <TextField
                  label="Nom"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  required={true}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Prénom"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleFormChange}
                  required={true}
                  fullWidth
                />
              </Grid>
              <Grid item xs={8}>
                <TextField
                  label="Card Number"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleFormChange}
                  type='number'
                  required={true}
                  fullWidth
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="CVV"
                  name="cvv"
                  value={formData.cvv}
                  type='number'
                  required={true}
                  onChange={handleFormChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Expiration Date (MM/YY)"
                    openTo="month"
                    format="MM/YY"
                    views={["month", "year"]}
                    value={formData.expirationDate}
                    onChange={handleDatePickerChange}
                  />
                </LocalizationProvider>                
              </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Annuler
          </Button>
          <Button color="primary">Valider la réservation</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

// Composant de recherche et de filtrage
const SearchAndFilter = () => {
  const [openFilterDrawer, setOpenFilterDrawer] = useState(false);

  const handleFilterClick = () => {
    setOpenFilterDrawer(true);
  };

  const handleCloseFilterDrawer = () => {
    setOpenFilterDrawer(false);
  };

  return (
    <div>
      <Box display="flex" justifyContent="center" mb={2}>
        <Stack direction="row" width="80%" spacing={2}>
          <TextField label="Rechercher par ville ou nom d'hôtel" fullWidth />
          <Button variant="contained" color="primary" onClick={handleFilterClick} startIcon={<TuneIcon />}>
            Filtrer
          </Button>
        </Stack>
      </Box>

      {/* Tiroir de filtrage */}
      <Drawer open={openFilterDrawer} onClose={handleCloseFilterDrawer}>
        <Box p={1}>
          <TextField label="Agence partenaire" fullWidth />
        </Box>
        <Box p={1}>
          <TextField label="Mot de passe" type='password' fullWidth />
        </Box>
        <Box p={1}>
          <TextField label="Ville de séjour" fullWidth />
        </Box>
        <Box p={1}>
          <TextField label="Date d'arrivée" 
            type='date' 
            InputLabelProps={{
              shrink: true
            }} 
            fullWidth />
        </Box>
        <Box p={1}>
          <TextField label="Date de départ" 
            type='date' 
            InputLabelProps={{
              shrink: true
            }} 
            fullWidth />
        </Box>
        <Box p={1}>
          <Autocomplete
            options={hotelCategories}
            renderInput={(params) => <TextField {...params} label="Catégorie d'hôtel" fullWidth />}
          />
        </Box>
        <Box p={1}>
          <TextField label="Nombre de personnes à héberger" type='number' fullWidth />
        </Box>
        <Box p={1}>
          <Button variant="contained" color="primary">
            Appliquer les filtres
          </Button>
        </Box>
      </Drawer>
    </div>
  );
};

const hotelCategories = ['1 étoile', '2 étoiles', '3 étoiles', '4 étoiles', '5 étoiles'];

// Composant principal
export const HotelList = () => {
  const hotels: Hotel[] = 
  [
    {
      id: 1,
      name: "Sample Hotel",
      address: {
        country: "Sample Country",
        city: "Sample City",
        street: "Sample Street",
        number: "123",
        location: "Sample Location",
        gps: "123.456,789.012",
      },
      price: 100,
      stars: 4,
      beds: 2,
      roomImage: "https://static5.depositphotos.com/1001540/504/i/950/depositphotos_5045505-stock-photo-luxurious-hotel.jpg",
    },
    {
      id: 2,
      name: "Sample Hotel",
      address: {
        country: "Sample Country",
        city: "Sample City",
        street: "Sample Street",
        number: "123",
        location: "Sample Location",
        gps: "123.456,789.012",
      },
      price: 100,
      stars: 4,
      beds: 2,
      roomImage: "https://static5.depositphotos.com/1001540/504/i/950/depositphotos_5045505-stock-photo-luxurious-hotel.jpg",
    },
    {
      id: 3,
      name: "Sample Hotel",
      address: {
        country: "Sample Country",
        city: "Sample City",
        street: "Sample Street",
        number: "123",
        location: "Sample Location",
        gps: "123.456,789.012",
      },
      price: 100,
      stars: 4,
      beds: 2,
      roomImage: "https://static5.depositphotos.com/1001540/504/i/950/depositphotos_5045505-stock-photo-luxurious-hotel.jpg",
    },
    {
      id: 4,
      name: "Sample Hotel",
      address: {
        country: "Sample Country",
        city: "Sample City",
        street: "Sample Street",
        number: "123",
        location: "Sample Location",
        gps: "123.456,789.012",
      },
      price: 100,
      stars: 4,
      beds: 2,
      roomImage: "https://static5.depositphotos.com/1001540/504/i/950/depositphotos_5045505-stock-photo-luxurious-hotel.jpg",
    }
  ]
  return (
    <div>
      <SearchAndFilter />
      <Grid container spacing={2}>
        {hotels.map((hotel: Hotel) => (
          <Grid item xs={12} sm={6} md={3} key={hotel.id}>
            <HotelCard hotel={hotel} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

//export default HotelList;

