import { Box, Paper, Skeleton, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";

import useRequest from "hooks/useRequest";
import ButtonIcon from "../../components/ButtonIcon";
import PhoneSvg from "../../components/Icons/PhoneSvg";
import LocationPinSvg from "../../components/Icons/LocationPinSvg";
import Image from "../../components/Image";
import ModeSvg from "components/Icons/ModeSvg";
import DeleteSvg from "components/Icons/DeleteSvg";
import { getDateDelete } from "utilities/formatDate";
import ReplaySvg from "components/Icons/ReplaySvg";

function GroceryDetails() {
  const request = useRequest();
  const navigate = useNavigate();

  const { name } = useParams();
  const { state } = useLocation();

  const [isLoading, setIsLoading] = useState(false);
  const [grocery, setGrocery] = useState({
    name: "",
    owner: "",
    phone_number: "",
    address: "",
    status: "active",
    item: [],
    certificate: [],
    image_url: "",
    date_delete: null,
  });

  const getGrocery = async () => {
    setIsLoading(true);
    try {
      const { data } = await request.get(`grocery/${name}`);
      setGrocery(data.Grocery);
    } catch (error) {
      console.error(error);
      navigate("/NotFound", {
        replace: true,
      });
    }

    setIsLoading(false);
  };

  useEffect(() => getGrocery(), []);

  useEffect(() => {
    console.log(state);
    if (state && state.isSubmitted) {
      getGrocery();
    }
  }, [state]);

  const { owner, phone_number, address, status, item, certificate, image_url, date_delete } = grocery;

  const skeleton = <Skeleton animation="wave" sx={{ minWidth: "200px" }} />;

  return (
    <Stack>
      <Typography variant="h4" color="gray.700">
        Thông tin cửa hàng sản xuất và kinh doanh thực phẩm
      </Typography>

      <Paper elevation={2} sx={{ padding: 4, marginTop: 4 }}>
        <Stack direction="row">
          <Stack flexGrow={1}>
            <Stack direction="row">
              {isLoading ? skeleton : <Image src={image_url} width={160} height={160}></Image>}

              <Stack mt={2} ml={4}>
                <Stack direction="row" alignItems="center">
                  <Typography variant="h4" mr={2}>
                    {isLoading ? skeleton : name}
                  </Typography>

                  {isLoading ? (
                    skeleton
                  ) : (
                    <Typography
                      bgcolor={status == "active" ? "green.100" : "red.100"}
                      color={status == "active" ? "green.500" : "red.500"}
                      borderRadius="20px"
                      py={1}
                      px={2}
                      variant="small"
                    >
                      {status == "active" ? "Đang hoạt động" : "Ngừng hoạt động"}
                    </Typography>
                  )}
                </Stack>

                <Stack direction="row" color="gray.500" alignItems="center" mt={1}>
                  <LocationPinSvg size={16} mr={1} />
                  <Typography variant="strong">{isLoading ? skeleton : address}</Typography>
                </Stack>

                <Stack direction="row" color="gray.500" alignItems="center" mt={1}>
                  <PhoneSvg size={16} mr={1} />
                  <Typography variant="strong">{isLoading ? skeleton : `${owner}: ${phone_number}`}</Typography>
                </Stack>
              </Stack>
            </Stack>

            <Typography variant="strong" color="gray.500" mt={2}>
              Mặt hàng kinh doanh:
            </Typography>
            <Stack direction="row" mt={1}>
              {isLoading
                ? skeleton
                : item.map((_item) => (
                    <Typography
                      key={_item.name}
                      bgcolor={_item.is_allowed ? "green.100" : "red.100"}
                      color={_item.is_allowed ? "green.500" : "red.500"}
                      variant="small"
                      py="2px"
                      px={1}
                      borderRadius="16px"
                      mr={1}
                    >
                      {_item.name}
                    </Typography>
                  ))}
            </Stack>

            <Typography variant="strong" color="gray.500" mt={2}>
              Chứng nhận được cấp:
            </Typography>
            <Stack direction="row" mt={1}>
              {isLoading
                ? skeleton
                : certificate.map((_certificate) => (
                    <Typography
                      key={_certificate.name}
                      bgcolor="green.100"
                      color="green.500"
                      variant="small"
                      py="2px"
                      px={1}
                      borderRadius="16px"
                      mr={1}
                    >
                      {_certificate.name}
                    </Typography>
                  ))}
            </Stack>

            {date_delete && (
              <Typography variant="strong" color="red.500" mt={4}>
                Cửa hàng này sẽ bị xoá vĩnh viễn sau: {getDateDelete(date_delete)}
              </Typography>
            )}
          </Stack>

          <Stack>
            <ButtonIcon
              variant="contained"
              LeftIcon={ModeSvg}
              onClick={() => {
                navigate("Edit", {
                  state: grocery,
                });
              }}
              sx={{ marginBottom: 2 }}
            >
              Chỉnh sửa
            </ButtonIcon>
            {date_delete ? (
              <ButtonIcon
                variant="contained"
                color="green"
                LeftIcon={ReplaySvg}
                onClick={() => {
                  request.put(`grocery/restore/${name}`).then(() => getGrocery());
                }}
              >
                Khôi phục
              </ButtonIcon>
            ) : (
              <ButtonIcon
                variant="contained"
                color="red"
                LeftIcon={DeleteSvg}
                onClick={() => {
                  navigate("Delete", {
                    state: grocery,
                  });
                }}
              >
                Xoá
              </ButtonIcon>
            )}
          </Stack>
        </Stack>
      </Paper>

      {/* Portal to render Modals */}
      <Outlet />
    </Stack>
  );
}

export default GroceryDetails;
